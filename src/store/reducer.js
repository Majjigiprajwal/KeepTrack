import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE,ADD_UPDATE_EXPENSE } from "./action";

export const reducer = (state, action) => {

  let currentItem={};
  switch (action.type) {
    case ADD_EXPENSE:
      const newData = { ...action.data };
      console.log(newData);
      newData.id = state.expenses.length + 1;
      console.log(newData);
      return{
        ...state,
        expenses:[...state.expenses,newData],
      };
    case DELETE_EXPENSE:
      const newStore = state.expenses.filter((expenseObj) => {
        if (expenseObj.id !== action.id) return expenseObj;
      });
      return {
        ...state,
        expenses:[...newStore],
      };

      case UPDATE_EXPENSE:

      const updated=state.expenses.filter((obj)=>{
        if(obj.id===action.id){
          currentItem=obj;
        }
        else{
          return obj;
        }
      })

      return {
        ...state,
        update:currentItem,
      }

      case ADD_UPDATE_EXPENSE:
        console.log("reached")
        console.log(action.payload);
      const toBeUpdated=state.expenses.map((expense)=>{
        if(expense.id==action.payload.id){
          console.log(action.payload.id);
          expense={...action.payload.updated,id:action.payload.id};
          return expense;
        }
        return expense;
      })

      return {
        ...state,
        expenses:[...toBeUpdated],
      }
          
    default:
      return state;
  }
};