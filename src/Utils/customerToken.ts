export default function customerToken() {

  //USA FETCH PARA PEGAR OS DADOS DO CLIENTE
  const pegarDados = async() => {
    const resposta = await fetch('http://localhost:5000/customerData', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token")
      })
    })
    const propertyNames: Object = await resposta.json()
    return propertyNames
  }

  const user = pegarDados()
  console.log(user)
  return user
};
