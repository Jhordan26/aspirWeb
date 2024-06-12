export type foodItemStatic = {
  id: number;
  title: string;
  desc: string;
  price: string;
  imgSrc: string;
}
export type foodItemsStatic = {
  items: foodItemStatic[];
}
export type FoodItem = {
    id: number;
    title: string;
    description?: string;
    price: string;
    imageURL: string;
    calories: string;
    qty: string;
    category: string;
};

export type FoodItems = {
  items: FoodItem[];
}

export type FoodCategory = {
  id: number;
  name: string;
  urlParam: string;
  icon?: JSX.Element
}

export type cartItem = {
  id: number;
  fid: number;
  uid: string;
  qty: number;
}

export type cartItems = {
  items: cartItem[]
}

export type Usuarios= {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  genero: string;
  password: string;
  dni: string;
  celular: string;
}

export type Cursos= {
  id: number
  categoria_curso: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  imagen: string;
  plan_precio:number;
  link: string;
}

export type Category = {
  id: number;
  nombre:string;
  imagen: string;
}
