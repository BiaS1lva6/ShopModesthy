import ColeteAlfaiatariaCinza from "../img/ColeteCinzafrenteN.jpg"
import ColeteCinzaCosta from "../img/ColeteCinzaCostas.webp"
import ColeteBege from "../img/ColeteSocialFemininoBranco.jpeg.jpg"
import ColeteBegeDiagonal1 from "../img/ColeteLongoAlfaiatariaBegeDiagonal.webp"
import ColeteBegeDiagonal2 from "../img/ColeteLongoAlfaiatariaBegeDiagonal2.webp"
import ColeteCinzaDiagnal1 from "../img/ColeteCinzaAlfaiataria.jpg"
import ColetePretoFrente from "../img/ModestyRubies.jpg"
import ColetePretoDiagnal1 from "../img/ColetePretoDiagonal.webp"
import ColetePretoDiagnal2 from "../img/ColeteDiagonalPreto2.webp"
import ColetePretoCostas from "../img/ColeteAlfaiatariaPretoCOSTAS.webp"
import ColeteBegeTransversal from "../img/ColeteBegeFrente1.jpg"
import ColeteBegeTransversalDiagonal1 from "../img/ColeteBegeDiagonal.jpg"
import ColeteBegeTransversalCosta from "../img/ColeteBegeCosta.jpg"
import ColeteBegeCosta from "../img/ColeteBegeCostas.webp"
import VestidoFloralFrente from "../img/VestidoFloralFrente.webp"
import VestidoFloralCostas from "../img/VestidoFloralCostas.webp"
import VestidoSummerFrente from "../img/VestidoLongoBrancoSummer.jpg"
import VestidoSummerCostas from "../img/VestidoBrancoSummerCostas.webp"
import VestidoMidiPreto from "../img/EleganceFrente.jpg"
import VestidoMidiPretoCostas from "../img/VestidoMidePretoEleganteCostas.webp"
import VestidoPrincesaFrente from "../img/ModestyRubies (1).jpg"
import VestidoPrincesaCostas from "../img/VestidoCurtoprincesaPretoCostas.webp"
import ConjuntoDeboraFrente from "../img/Deborah.jpg"
import ConjuntoDeboraCostas from "../img/ConjuntoDeborahCostas.webp"
import ConjuntoMacacaoPreto from "../img/ConjuntoMacacaopretoFrente.webp"
import ConjuntoMacacaoPretoCostas from "../img/ConjuntoMacacãoPretoCostas..jpg"
import ConjuntoSocialPreto from "../img/ConjuntopretoFrente.webp"
import ConjuntoSocialPretoCostas from "../img/ConjuntoPretoCostas.webp"
import ConjuntoSocialBranco from "../img/ConjuntoBrancoFrente.webp"
import ConjuntoSocialBrancoCostas from "../img/ConjuntoBrancoCostas.webp"
import ConjuntoMarrom from "../img/ConjuntoMarromFrente.webp"
import ConjuntoMarromCostas from "../img/ConjuntoMarromCostas.webp"
import ConjuntoSaia from "../img/ConjuntoDeSaiaPretofrente.webp" 
import ConjuntoSaiaCostas from "../img/ConjuntoDeSaiaPretoCostas.webp"
import ConjuntoGirlCreamMilk from "../img/ConjuntoCompletoSocialGirlCreamMilk.webp"
import ConjuntoGirlCreamMilkCostas from "../img/ConjuntoCompletoSocialGirlCreamMilkCostas.jpg"
import ConjuntoGirlPreto from "../img/ConjuntoPretoSocialGirlFrente.webp"
import ConjuntoGirlPretoCostas from "../img/ConjuntoPretoCostas2.webp"


const products = [
  {
    id: 1,
    name: "CONJUNTO BLUSA + MACACÃO TODO-PRETO",
    price: 229.99,
    originalPrice: 289.99,
    installmentValue: 23.0,
    image: ConjuntoMacacaoPreto,
    images: [
      ConjuntoMacacaoPreto,
      ConjuntoMacacaoPretoCostas,
    ],
    category: "conjuntos",
    inStock: true,
  },
  {
    id: 2,
    name: "CONJUNTO SAIA E BLAZER SOCIAL PREÇO PRETO",
    price: 229.99,
    originalPrice: 289.99,
    installmentValue: 23.0,
    image: ConjuntoSaia,
    images: [
      ConjuntoSaia,
      ConjuntoSaiaCostas,
    ],
    category: "conjuntos",
    inStock: true,
  },
  {
    id: 3,
    name: "CONJUNTO COMPLETO SOCIAL GIRL PRETO",
    price: 219.99,
    originalPrice: 279.99,
    installmentValue: 22.0,
    image: ConjuntoGirlPreto,
    images: [
      ConjuntoGirlPreto,
      ConjuntoGirlPretoCostas,
    ],
    category: "conjuntos",
    inStock: true,
  },
  {
    id: 4,
    name: "CONJUNTO COMPLETO SOCIAL GIRL CREAM MILK",
    price: 219.99,
    originalPrice: 279.99,
    installmentValue: 22.0,
    image: ConjuntoGirlCreamMilk,
    images: [
      ConjuntoGirlCreamMilk,
      ConjuntoGirlCreamMilkCostas,
    ],
    category: "conjuntos",
    inStock: true,
  },
  {
    id: 5,
    name: "CONJUNTO SHORTS + COLETE COCOA BROWN",
    price: 179.99,
    originalPrice: 229.99,
    installmentValue: 18.0,
    image: ConjuntoMarrom,
    images: [
     ConjuntoMarrom,
      ConjuntoMarromCostas,
    ],
    category: "conjuntos",
    inStock: true,
  },
  {
    id: 6,
    name: "CONJUNTO SHORT + COLETE BRANCO",
    price: 179.99,
    originalPrice: 229.99,
    installmentValue: 18.0,
    image: ConjuntoSocialBranco,
    images: [
      ConjuntoSocialBranco,
      ConjuntoSocialBrancoCostas,
    ],
    category: "conjuntos",
    inStock: true,
  },
  {
    id: 7,
    name: "CONJUNTO SHORT + COLETE PRETO",
    price: 179.99,
    originalPrice: 229.99,
    installmentValue: 18.0,
    image: ConjuntoSocialPreto,
    images: [
     ConjuntoSocialPreto,
     ConjuntoSocialPretoCostas,
    ],
    category: "conjuntos",
    inStock: true,
  },
  {
    id: 8,
    name: "CONJUNTO DEBORAH BRANCO",
    price: 199.99,
    originalPrice: 249.99,
    installmentValue: 20.0,
    image: ConjuntoDeboraFrente,
    images: [
      ConjuntoDeboraFrente,
      ConjuntoDeboraCostas,
    ],
    category: "conjuntos",
    inStock: true,
  },
  {
    id: 9,
    name: "VESTIDO CURTO PRETO PRINCESA",
    price: 199.99,
    originalPrice: 249.99,
    installmentValue: 20.0,
    image: VestidoPrincesaFrente,
    images: [
      VestidoPrincesaFrente,
      VestidoPrincesaCostas,
    ],
    category: "vestidos",
    inStock: true,
  },
  {
    id: 10,
    name: "VESTIDO LONGO BRANCO SUMMER",
    price: 229.99,
    originalPrice: 289.99,
    installmentValue: 23.0,
    image: VestidoSummerFrente,
    images: [
      VestidoSummerFrente,
      VestidoSummerCostas,
    ],
    category: "vestidos",
    inStock: true,
  },
  {
    id: 11,
    name: "VESTIDO CURTO FLORAL PRIMAVERA",
    price: 159.99,
    originalPrice: 199.99,
    installmentValue: 16.0,
    image: VestidoFloralFrente,
    images: [
      VestidoFloralFrente,
      VestidoFloralCostas,
    ],
    category: "vestidos",
    inStock: true,
  },
  {
    id: 12,
    name: "VESTIDO LONGO PRETO ELEGANCE",
    price: 189.99,
    originalPrice: 239.99,
    installmentValue: 19.0,
    image: VestidoMidiPreto,
    images: [
      VestidoMidiPreto,
      VestidoMidiPretoCostas,
    ],
    category: "vestidos",
    inStock: true,
  },
  {
    id: 13,
    name: "COLETE ALFAIATARIA PRETO",
    price: 159.99,
    originalPrice: 199.99,
    installmentValue: 16.0,
    image: ColetePretoFrente,
    images: [
      ColetePretoFrente,
      ColetePretoDiagnal1,
      ColetePretoDiagnal2,
      ColetePretoCostas,
    ],
    category: "coletes",
    inStock: true,
  },
  {
    id: 14,
    name: "COLETE SOCIAL TRANSVERSAL NUDE",
    price: 149.99,
    originalPrice: 189.99,
    installmentValue: 15.0,
    image: ColeteBegeTransversal,
    images: [
      ColeteBegeTransversal,
      ColeteBegeTransversalDiagonal1,
      ColeteBegeTransversalCosta,
    ],
    category: "coletes",
    inStock: true,
  },
  {
    id: 15,
    name: "COLETE CINZA ALFAIATARIA",
    price: 139.99,
    originalPrice: 179.99,
    installmentValue: 14.0,
    image: ColeteAlfaiatariaCinza,
    images: [
      ColeteAlfaiatariaCinza,
     ColeteCinzaCosta,
      ColeteCinzaDiagnal1,
    ],
    category: "coletes",
    inStock: true,
  },
  {
    id: 16,
    name: "COLETE LONGO ALFAIATARIA BEGE",
    price: 179.99,
    originalPrice: 229.99,
    installmentValue: 18.0,
    image: ColeteBege,
    images: [
      ColeteBege,
      ColeteBegeDiagonal1,
      ColeteBegeDiagonal2,
      ColeteBegeCosta,

    ],
    category: "coletes",
    inStock: true,
  },
]

export default products

export const getProductsByCategory = (category) => {
  return products.filter((product) => product.category === category)
}

export const getProductById = (id) => {
  return products.find((product) => product.id === Number(id))
}

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase()
  return products.filter((product) => product.name.toLowerCase().includes(searchTerm))
}
