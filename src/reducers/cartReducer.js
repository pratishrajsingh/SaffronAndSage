export const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  CLEAR: "CLEAR",
};

export const initialCartState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { dish, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.id === dish.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }

      return { ...state, items: [...state.items, { ...dish, quantity }] };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };

    case CART_ACTIONS.INCREASE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case CART_ACTIONS.DECREASE:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };

    case CART_ACTIONS.CLEAR:
      return initialCartState;

    default:
      return state;
  }
}
