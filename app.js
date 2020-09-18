const Foods = (function() {
    let foodList = [];
    let totalCalorie = 0;

    return {
        init: function() {
            foodList = this.getFoodList();
            totalCalorie = this.setCalorie();
        },

        getFoodList: function() {
            let list = localStorage.getItem('foodList');
            if(list == null || list == '') {
                list = JSON.stringify([]);
            }
            return JSON.parse(list);
        },

        // Whenever modification takes place setCalorie will run
        setCalorie: function() {
            totalCalorie = foodList.reduce((total, a) => total += ~~a.calorie, 0);
            document.querySelector('.total-calorie-value').innerHTML = totalCalorie;
        },
    
        addFood: function() {
            const name = document.querySelector('#food');
            const calorie = document.querySelector('#calorie');
            
            if(name.value !== '' && calorie.value !== '') {
                const newFood = { 
                    name: name.value, 
                    calorie: calorie.value 
                };
                // Adding the newFood to the food list
                foodList.push(newFood);
                // Saving the modified foodlist to localStorage
                localStorage.setItem('foodList', JSON.stringify(foodList));
                // Displaying food list
                UICtrl.displayFoods();
                // updating calorie
                this.setCalorie();
            }
        }
    }
})();

// UICtrl
const UICtrl = (function() {
    const ul = document.querySelector('.food-list');

    return {
        displayFoods: function() {
            const foodList = Foods.getFoodList();
            ul.innerHTML = '';
            for(let i in foodList) {
                ul.innerHTML += `
                <li class="list-group-item lead">
                    <b>${foodList[i].name} : </b>${foodList[i].calorie} calories
                    <span class="float-right" style="cursor: pointer">
                        <i class="fas fa-pencil-alt edit" onclick="onEditClick(this)"></i>
                    </span>
                </li>
                `;
            }
        },
        // Clearing foods items
        clear: function() {
            if(confirm('Do you really want to clear all the food items?')) {
                localStorage.setItem('foodList', '');
                // Reseting foodList and calorie
                Foods.init();
                // Clearing UI
                ul.innerHTML = '';
            }
        }
    }
})();

// on click edit icon -> current state changes to ModifyState
const onEditClick = function(e) {
    const li = Array.from(document.querySelectorAll('.food-list li'));
    const currentIndex = li.indexOf(e.parentElement.parentElement);
    state.change(new ModifyState(currentIndex));
}

const clear = document.querySelector('.clear');
let addBtnOn = true;

Foods.init();
UICtrl.displayFoods();

clear.addEventListener('click', () => {
    UICtrl.clear();
});
