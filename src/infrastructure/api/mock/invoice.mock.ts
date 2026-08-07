const mockInvoiceInputAdd = {
  id: "1",
  name: "Lucian",
  document: "1234567890",
  street: "Rua 123",
  number: "1549",
  complement: "ap 123",
  city: "Criciúma",
  state: "SC",
  zipCode: "99999-999",
  items: [
    {
      id: "1",
      name: "Product mock 1",
      price: 20,
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
}

const mockInvoiceInputNotAdd = {
  id: "3",
  name: "Lucian",
  document: "1234567890",
  street: "Rua 123",
  number: "1549",
  complement: "",
  city: "Criciúma",
  state: "SC",
  zipCode: "99999-999",
  items: '',
  createdAt: new Date(),
  updatedAt: new Date()
}

export { mockInvoiceInputAdd, mockInvoiceInputNotAdd }