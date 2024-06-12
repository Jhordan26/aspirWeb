import { Cursos, cartItem } from "../../types";
import {
  firebaseAddToCart,
  firebaseDeleteCartItem,
  firebaseDeleteFood,
  firebaseEmptyUserCart,
  firebaseFetchAllCartItems,
  fetchCursosItems,
  firebaseGetAllUsers,
  firebaseGetUser,
  firebaseLogout,
  firebaseUpdateCartItem,
  firebaseUpdateUser,
} from "../Firebase";

import { MdShoppingBasket } from "react-icons/md";
import { toast } from "react-toastify";

export const addToCart = async (
  cartItems: cartItem[],
  foodItems: Cursos[],
  user: any,
  fid: number,
  dispatch: any
) => {
  if (!user) {
    toast.error("Por favor, inicia sesión para agregar elementos al carrito", {
      icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
      toastId: "unauthorizedAddToCart",
    });
  } else {
    if (cartItems.some((item: cartItem) => item["fid"] === fid)) {
      toast.error("El ítem ya está en el carrito", {
        icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
        toastId: "itemAlreadyInCart",
      });
    } else {
      const data: cartItem = {
        id: Date.now(),
        fid: fid,
        uid: user.uid,
        qty: 1,
      };
      dispatch({
        type: "SET_CARTITEMS",
        cartItems: [...cartItems, data],
      });
      calculateCartTotal(cartItems, foodItems, dispatch);
      await firebaseAddToCart(data);
    }
  }
};

export const dispatchUserCartItems = (
  uid: string,
  items: cartItem[],
  dispatch: any
) => {
  const cartItems = items.filter((item: cartItem) => item.uid === uid);
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });

  return cartItems;
};

export const fetchUserCartData = async (user: any, dispatch: any) => {
  if (user) {
    await firebaseFetchAllCartItems()
      .then((data) => {
        const userCart = dispatchUserCartItems(user.uid, data, dispatch);
        localStorage.setItem("cartItems", JSON.stringify(userCart));
      })
      .then(() => { })
      .catch((e) => {
        console.log(e);
      });
  } else {
    localStorage.setItem("cartItems", "undefined");
  }
};

export const fetchFoodData = async (dispatch: any) => {
  await fetchCursosItems()
    .then((data) => {
      dispatch({
        type: "SET_FOOD_ITEMS",
        foodItems: data,
      });
    })
    .then(() => { })
    .catch((e) => {
      console.log(e);
    });
};

export const getFoodById = (foodItems: Cursos[], id: number) => {
  return foodItems.find((item: Cursos) => item.id);
};


//  Update cart item State
export const updateCartItemState = async (
  cartItems: cartItem[],
  item: cartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index] = item;
  }
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });
  await firebaseUpdateCartItem(item)
    .then(() => { })
    .catch((e)=> {
      console.log(e);
    });
};

// Update Cart Item Quantity
export const updateCartItemQty = async (
  cartItems: cartItem[],
  foodItems: Cursos[],
  item: cartItem,
  dispatch: any,
  val: number
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index].qty += val;
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
    await firebaseUpdateCartItem(cartItems[index])
      .then(() => { })
      .catch((e) => {
        console.log(e);
      });
  }
};

//  Delete Cart Item
export const deleteCartItem = async (
  cartItems: cartItem[],
  foodItems: Cursos[],
  item: cartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems.splice(index, 1);
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
    await firebaseDeleteCartItem(item)
      .then(() => { })
      .catch((e) => {
        console.log(e);
      });
  }
};

// Calculate Total Price Round to 2 decimal places
export const calculateCartTotal = (
  cartItems: cartItem[],
  foodItems: Cursos[],
  dispatch: any
) => {
  let total = 0;
  cartItems.forEach((item: cartItem) => {
    const foodItem = getFoodById(foodItems, item.fid);
    total += item.qty * parseFloat(foodItem?.plan_precio.toString() || "0");
  });
  dispatch({
    type: "SET_CART_TOTAL",
    cartTotal: total.toFixed(2),
  });
};

// Empty Cart
export const emptyCart = async (
  cartItems: cartItem[],
  foodItems: Cursos[],
  dispatch: any
) => {
  if (cartItems.length > 0) {
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: [],
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
    await firebaseEmptyUserCart(cartItems)
      .then(() => { })
      .catch((e) => {
        console.log(e);
      });
  } else {
    toast.warn("El carrito ya está vacío");
  }
};

// Hide Cart
export const hideCart = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CART",
    showCart: !true,
  });
};

// Hide Cart
export const hideContactform = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CONTACT_FORM",
    showContactForm: !true,
  });
};

export const shuffleItems = (items: any) => {
  let currentIndex = items.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [items[currentIndex], items[randomIndex]] = [
      items[randomIndex],
      items[currentIndex],
    ];
  }

  return items;
};

export const logout = (dispatch: any, navigate: any) => {
  dispatch({
    type: "SET_USER",
    user: null,
  });
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: [],
  });
  dispatch({
    type: "SET_ADMIN_MODE",
    adminMode: false,
  });

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("cartItems");
  navigate("/");
};

export const ToggleAdminMode = (dispatch: any, state: boolean) => {
  dispatch({
    type: "SET_ADMIN_MODE",
    adminMode: state,
  });
  localStorage.setItem("adminMode", JSON.stringify(state));
  console.log(state);
};

export const isAdmin = (user: any) => {
  let isAdmin = user?.email == "bentilshadrack72@gmail.com" || user?.email == "admin@test.com";
  return isAdmin;
};

// get user
export const getUserData = async (user: any) => {
  return await firebaseGetUser(user.uid);
};

// update currentUser
export const updateUserData = async (
  user: any,
  dispatch: any,
  alert: boolean
) => {
  await firebaseUpdateUser(user)
    .then(() => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    })
    .catch((e: any) => {
      console.log(e);
    })
    .then(() => {
      localStorage.setItem("user", JSON.stringify(user));
      alert && toast.success("Datos del usuario actualizados exitosamente");
    });
};

// get all users
export const dispatchUsers = async (dispatch: any) => {
  await firebaseGetAllUsers()
    .then((users: any) => {
      dispatch({
        type: "SET_USERS",
        users: users,
      });
    })
    .catch((e: any) => {
      console.log(e);
    });
};

export const getAllUser = async () => {
  await firebaseGetAllUsers()
    .then((users: any) => {
      return users;
    })
    .catch((e: any) => {
      console.log(e);
    });
};

// delete food
export const deleteFood = async (
  food: Cursos,
  foodItems: Cursos[],
  dispatch: any
) => {
  await firebaseDeleteFood(food.id);
  // remove food from foodItems
  const foodIndex = foodItems.indexOf(food);
  if (foodIndex !== -1) {
    foodItems.splice(foodIndex, 1);
  }
  dispatch({
    type: "SET_FOOD_ITEMS",
    foodItems,
  });
  toast.success("Comida eliminada exitosamente");
};

