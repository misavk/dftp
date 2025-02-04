import os
import requests
import logging
from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from typing import Optional, List, Dict
from starlette.staticfiles import StaticFiles
from starlette.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline  # Biblioteca de IA para NLP

# Configuração do logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Criação da aplicação FastAPI
app = FastAPI()

# Configuração de CORS com restrição de origens específicas
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Substitua pelo domínio do seu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

# Ajuste para resolver o caminho correto para a pasta public
project_root = os.path.dirname(os.path.abspath(__file__))  # Caminho absoluto para o diretório 'backend'
public_path = os.path.join(project_root, "../public")  # Caminho para a pasta 'public'

# Verifique se o diretório public existe
if not os.path.exists(public_path):
    logger.error(f"O diretório 'public' não foi encontrado no caminho: {public_path}")
else:
    logger.info(f"Caminho para a pasta 'public' foi resolvido como: {public_path}")

# Monta o diretório estático corretamente, assumindo que a pasta 'public' está na raiz do projeto
app.mount("/static", StaticFiles(directory=public_path), name="static")

# Modelos Pydantic para validação dos dados
class AuthCredentials(BaseModel):
    usuario: str
    senha: str

class Evento(BaseModel):
    codigo: int
    data: str
    obs: Optional[str] = None
    recebedor: Optional[Dict[str, str]] = None
    agendamento: Optional[Dict[str, str]] = None

class Documento(BaseModel):
    cliente: str
    tipo: str
    tipo_op: str
    numero: int
    serie: str
    chave: Optional[str] = None
    minuta: Optional[int] = None
    coleta: Optional[int] = None
    manifesto: Optional[int] = None
    eventos: List[Evento]
    anexos: Optional[List[Dict[str, str]]] = None

class OcorrenciaPayload(BaseModel):
    auth: Optional[AuthCredentials] = None
    documentos: List[Documento]

class TextoIA(BaseModel):
    texto: str

# Inicializando o pipeline de IA
summarizer = pipeline("summarization")

# Função para autenticação
def obter_token(usuario: str, senha: str):
    url = "https://dftransportes.brudam.com.br/api/v1/acesso/auth/login"
    data = {"usuario": usuario, "senha": senha}
    logger.info(f"Tentando autenticar com: {data}")
    try:
        response = requests.post(url, json=data)
        logger.info(f"Resposta da API: {response.status_code}, {response.text}")
        response.raise_for_status()

        # Verifica se a resposta é JSON e contém a chave de acesso
        if response.headers.get("Content-Type") == "application/json":
            json_data = response.json()
            access_key = json_data.get("data", {}).get("access_key")
            if not access_key:
                logger.error(f"Resposta inesperada: {json_data}")
                raise HTTPException(status_code=500, detail="Chave de acesso não encontrada na resposta")
            return access_key
        else:
            raise HTTPException(status_code=500, detail="Resposta inesperada da API")
    except requests.RequestException as e:
        logger.error(f"Erro durante autenticação: {e}")
        raise HTTPException(
            status_code=response.status_code if response else 500,
            detail=f"Erro ao autenticar: {response.json().get('message', str(e)) if response else 'API inativa'}"
        )

# Endpoint de login
@app.post("/login")
def login(credentials: AuthCredentials):
    token = obter_token(credentials.usuario, credentials.senha)
    if not token:
        raise HTTPException(status_code=401, detail="Falha na autenticação")
    return {"token": token}

# Novo endpoint para buscar ocorrências por Minuta
@app.get("/tracking/ocorrencias/minuta")
def tracking_ocorrencias_minuta(
    codigo: str,  # Número da Minuta que será buscada
    comprovante: Optional[int] = 0,  # Comprovante de entrega: 0 - Não, 1 - Sim
    token: str = Header(...),  # Token de autenticação no cabeçalho
):
    """
    Busca as ocorrências para uma determinada Minuta ou lista de Minutas.

    - `codigo`: Número da Minuta ou lista de Minutas separada por vírgula (máximo 50 documentos).
    - `comprovante`: Indica se retorna comprovante de entrega (0 ou 1).
    - `token`: Token de autenticação no cabeçalho.
    """
    # Verifica se o código contém mais de 50 minutas
    codigo_lista = codigo.split(",")
    if len(codigo_lista) > 50:
        raise HTTPException(status_code=400, detail="Número máximo de 50 minutas permitidas.")

    # Parâmetros para a requisição
    url = "https://dftransportes.brudam.com.br/api/v1/tracking/ocorrencias/minuta"
    headers = {"Authorization": f"Bearer {token}"}
    params = {"codigo": ",".join(codigo_lista), "comprovante": comprovante}

    logger.info(f"Requisição para tracking de Minuta com params: {params}")

    try:
        response = requests.get(url, headers=headers, params=params)
        logger.info(f"Resposta da API de tracking: {response.status_code}, {response.text}")
        response.raise_for_status()

        if response.headers.get("Content-Type") == "application/json":
            return response.json()
        else:
            raise HTTPException(status_code=500, detail="Resposta inesperada da API")
    except requests.RequestException as e:
        logger.error(f"Erro ao buscar ocorrências de Minuta: {e}")
        raise HTTPException(
            status_code=response.status_code if response else 500,
            detail=f"Erro ao buscar ocorrências: {response.json().get('message', str(e)) if response else 'API inativa'}"
        )

# Endpoint para sumarizar texto com IA
@app.post("/ia/sumarizar")
def sumarizar_texto(payload: TextoIA):
    """
    Recebe um texto e retorna um resumo gerado por IA.
    
    - `texto`: Texto a ser sumarizado.
    """
    try:
        resumo = summarizer(payload.texto, max_length=50, min_length=25, do_sample=False)
        return {"resumo": resumo[0]["summary_text"]}
    except Exception as e:
        logger.error(f"Erro ao sumarizar texto: {e}")
        raise HTTPException(status_code=500, detail="Erro ao processar o texto com IA")

# Rota raiz para o frontend
@app.get("/")
def read_root():
    index_path = os.path.join(public_path, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "Bem-vindo à API!"}
