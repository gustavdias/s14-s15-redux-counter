const initialState = {
  counter: 0,
  results: [], //updating state immutably
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      //since there is return, you don't need to use break
      //   return {
      //! counter: state.counter + 1, //since know the state is a object with a number and an array, I can't use this
      //if you use it, it will eliminate results array, counter: state.counter will be the new state instead
      //*instead we should copy the old state properties and then only update the ones which need updating
      // ! Updating State Immutably - passing an empty javascript object us to the first argument and the old javascript object we want to copy as the second state
      //? It isn't a deep clone
      const newState = Object.assign({}, state);
      newState.counter = state.counter + 1;
      return newState;
    // };
    case "DECREMENT":
      //   return {
      //     counter: state.counter - 1,
      //   };
      //! Updating State Immutably
      return {
        ...state,
        counter: state.counter - 1,
      };
    //* This simply tells javascript return a javascript object, take all the properties and values of the state argument which is our old state, distribute these properties with their values in this new object and then since we define an additional property, add this property to the object or if it already was present due to us distributing the old state as it would be for the counter, this is part of the old state, overwrite this but only this, leave results untouched.
    case "ADD":
      //   return {
      //     counter: state.counter + action.payload,
      //   };
      //! Updating State Immutably
      return {
        ...state,
        counter: state.counter + action.payload,
      };

    case "SUBTRACT":
      //   return {
      //     counter: state.counter - action.payload,
      //   };
      //! Updating State Immutably
      return {
        ...state,
        counter: state.counter - action.payload,
      };
    case "STORE_RESULT":
      return {
        ...state,
        //return a javascript object where we distribute the old state thus keeping the counter but then we set results here:
        results: state.results.concat({ id: new Date(), value: state.counter }), //concat is like push, but creates a new array
      };
    case "DELETE_RESULT":
      //   const id = 2;
      //   state.results.splice(id, 1); //! This mutates the original array

      //! Volta -  1st way to update Arrays Immutably - Coping the array
      //   const id = 2;
      //   const updatedArray = [...state.results];
      //--------
      //! Volta - if the elements in state.results were objects as they actually are, the objects themselves are still pointing to the same objects they did before.
      //? if you change a property in one of the elements themselves, just creating a new array like this isn't enough, if you just plan on removing an object though, that is okay
      //   updatedArray.splice(id, 1);

      //--------
      //! Volta - 2nd way to update Arrays Immutably - filter method - originalArray.filter() - filter returns a new array
      //. Filter takes a function as an input, the function is executed on each element in the array, it determines whether this element fulfils a certain condition to make it into the new array

      const updatedArray = state.results.filter(
        (result) => result.id !== action.resultElId
      );

      return {
        ...state,
        results: updatedArray,
      };
    //* So we get the individual element as an input here, the element or in our case, the result
    // state.result.filter(result => true); //? if you return true, you return this for every element and therefore, you just created a copy of the old array,
    //* return true for every element which doesn't have a certain ID
    default:
      console.log("default case");
      return state;
  }

  //   if (action.type === "INCREMENT") {
  //     return {
  //       counter: state.counter + 1,
  //     };
  //   }
  //   //DECREMENT
  //   if (action.type === "DECREMENT") {
  //     return {
  //       counter: state.counter - 1,
  //     };
  //   }

  //   //ADD
  //   if (action.type === "ADD") {
  //     return {
  //       counter: state.counter  + action.payload,
  //     };
  //   }
  //   //SUBTRACT
  //   if (action.type === "SUBTRACT") {
  //     return {
  //       counter: state.counter - action.payload,
  //     };
  //   }

  //   return state;
};

export default reducer;
