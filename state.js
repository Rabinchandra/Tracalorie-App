const State = function() {
    let currentState;
    
    this.change = function(state) {
        currentState = state;
    }
}
// Instantiate state
const state = new State();

// Types of states
const AddState = function() {
    document.querySelector('.btn-container').innerHTML = `
    <div class="btn btn-success add-food">Add <i class="fas fa-plus-circle"></i></div>
    `;
    const addBtn = document.querySelector('.add-food');
    addBtn.addEventListener('click', () => {
        Foods.addFood();
    });
}

const ModifyState = function(currentIndex) {
    document.querySelector('.btn-container').innerHTML = `
    <div class="btn btn-warning mr-4 update">Update <i class="fas fa-edit"></i></div>
    <div class="btn btn-danger delete mr-4">Delete <i class="fas fa-minus-circle"></i></div>
    <div class="btn btn-primary cancel">Cancel</div>
    `;
    
    const updateBtn = document.querySelector('.update');
          deleteBtn = document.querySelector('.delete');
          cancelBtn = document.querySelector('.cancel');
          foodInput = document.querySelector('#food');
          calorieInput = document.querySelector('#calorie');
          foodList = Foods.getFoodList();
    
    foodInput.value = foodList[currentIndex].name;
    calorieInput.value = foodList[currentIndex].calorie;

    updateBtn.addEventListener('click', () => {
        // Updating the values of the current food 
        foodList[currentIndex].name = foodInput.value;
        foodList[currentIndex].calorie = calorieInput.value;
        // Saving to localStorage
        localStorage.setItem('foodList', JSON.stringify(foodList));
        // Updating foodList and totalCalorie
        Foods.init();
        // display the modified list
        UICtrl.displayFoods();
        
    });

    deleteBtn.addEventListener('click', () => {
        if(confirm('Are you sure want to delete?')) {
            // Removing the current food from foodList
            foodList.splice(currentIndex, 1);
            // Saving to localStorage
            localStorage.setItem('foodList', JSON.stringify(foodList));
            // Updating foodList and totalCalorie
            Foods.init();
            // display the modified list
            UICtrl.displayFoods();
            // State returns to add
            state.change(new AddState());
            // Clearing up the input values
            foodInput.value = '';
            calorieInput.value = '';
        }
    });

    cancelBtn.addEventListener('click', () => {
        state.change(new AddState());
        foodInput.value = '';
        calorieInput.value = '';
    })
}

state.change(new AddState());
