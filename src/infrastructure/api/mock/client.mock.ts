const mockClientInputAdd = {
  id: "123",
  name: "Lucian",
  email: "lucian@teste.com",
  document: "12345678900",
  street: "Rua 123",
  number: "99",
  complement: "Casa Verde",
  city: "Criciúma",
  state: "SC",
  zipCode: "18460-000",
}

const mockClientInputNotAdd = {
  id: "123",
  name: "",
  email: "lucian@teste.com",
  document: "12345678900",
  address: {
    street: "Rua 123",
    number: "99",
    complement: "Casa Verde",
    city: "Criciúma",
    state: "SC",
    zipCode: "18460-000",
  }
}

export { mockClientInputAdd, mockClientInputNotAdd }