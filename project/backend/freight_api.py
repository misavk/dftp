import requests
import json

# Função para autenticação e obtenção do token (caso seja necessário)
def authenticate():
    auth_url = "https://somaexpress.brudam.com.br/api/v1/auth"  # URL de autenticação
    auth_data = {
        "usuario": "SEU_USUARIO",  # Substitua com seu nome de usuário
        "senha": "SUA_SENHA"       # Substitua com sua senha
    }
    try:
        response = requests.post(auth_url, json=auth_data)
        response.raise_for_status()  # Verifica se a resposta foi bem-sucedida
        token = response.json().get("token")
        if token:
            return token
        else:
            print("Erro na autenticação: Token não encontrado.")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Erro ao autenticar: {e}")
        return None

# Função para buscar a cotação de frete
def fetch_freight_quote(data):
    url = "https://somaexpress.brudam.com.br/api/v1/comercial/emissao/cotacao"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {authenticate()}"  # Utiliza o token para autorização
    }

    if not headers["Authorization"]:
        print("Autenticação falhou. Não foi possível obter o token.")
        return None

    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()  # Lança um erro se a resposta não for 2xx
        return response.json()  # Retorna a resposta JSON da API
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        return None

# Função para preparar os dados da cotação
def prepare_freight_data():
    return {
        "nDocEmit": "123456",
        "nDocCli": "654321",
        "solicit": "Nome do solicitante",
        "telSolicit": "1234567890",
        "rem": {
            "nDoc": "123456789",
            "IE": "123456",
            "xNome": "Remetente Exemplo",
            "xFant": "Fantasia Exemplo",
            "nFone": "1234567890",
            "ISUF": "12345",
            "xLgr": "Rua Exemplo",
            "nro": "123",
            "xCpl": "Apto 101",
            "xBairro": "Bairro Exemplo",
            "cMun": 1234567,
            "CEP": 12345678,
            "cPais": 1058,
            "email": "remetente@exemplo.com"
        },
        "dest": {
            "nDoc": "987654321",
            "IE": "654321",
            "xNome": "Destinatário Exemplo",
            "xFant": "Fantasia Destinatário",
            "nFone": "0987654321",
            "ISUF": "54321",
            "xLgr": "Rua Exemplo",
            "nro": "321",
            "xCpl": "Apto 102",
            "xBairro": "Bairro Destinatário",
            "cMun": 7654321,
            "CEP": 87654321,
            "cPais": 1058,
            "email": "destinatario@exemplo.com"
        },
        "cOrigCalc": 1,
        "cDestCalc": 1,
        "CEP": "12345678",
        "cTab": "1",
        "cServ": "MVT",
        "pBru": 0,
        "pCub": 0,
        "qVol": 1,
        "vNF": 100.00,
        "volumes": [
            {
                "dCom": 50,
                "dLar": 50,
                "dAlt": 50,
                "qVol": 1,
                "pBru": 100
            }
        ]
    }

# Função principal para realizar a cotação de frete
def main():
    # Autentica e obtém o token
    token = authenticate()
    if not token:
        print("Falha na autenticação.")
        return

    # Prepara os dados de entrada
    data = prepare_freight_data()

    # Faz a requisição para a API de cotação
    quote = fetch_freight_quote(data)

    # Exibe a resposta da API
    if quote:
        print("Cotação gerada com sucesso:", json.dumps(quote, indent=4))
    else:
        print("Falha ao gerar cotação.")

if __name__ == "__main__":
    main()
