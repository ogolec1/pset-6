let items = [];

let elements = document.getElementsByClassName("row");
let priorityButtons = document.getElementsByClassName("priority");
let completedButtons = document.getElementsByClassName("completed");
let removeButtons = document.getElementsByClassName("remove");

let priorityChanged;
let completionChanged;
let itemRemoved;

window.onload = function() {
  document.getElementById("task-table").onclick = runModificationFunctions;

  document.getElementById("submit-input").onclick = createItem;
};


const prioritizeItem = function() {
  priorityChanged = false;

  for (let i = 0; i < priorityButtons.length; i++) {
    priorityButtons[i].onclick = function() {
      if (items[i].prioritized === false) {
        const elementToPrioritize = elements[i];
        priorityButtons[i].style.backgroundColor = "#F08080";
        elements[0].before(elementToPrioritize);
        items[i].prioritized = true;

        const objectToMove = items[i];
        items.splice(i, 1);
        items.unshift(objectToMove);
        priorityChanged = true;
      } else if (items[i].prioritized) {
        const elementToPrioritize = elements[i];
        priorityButtons[i].style.backgroundColor = "white";
        elements[elements.length - 1].after(elementToPrioritize);
        items[i].prioritized = false;

        const objectToMove = items[i];
        items.splice(i, 1);
        items.push(objectToMove);
        priorityChanged = true;
      }
    };

    priorityButtons[i].onclick;

    if (priorityChanged) {
      break;
    }
  }
};

const markAsComplete = function() {
  completionChanged = false;

  for (let i = 0; i < completedButtons.length; i++) {
    completedButtons[i].onclick = function() {
      if (items[i].completed === false) {
        completedButtons[i].style.setProperty("text-decoration", "line-through");
        completedButtons[i].style.backgroundColor = "#D0F0C0";
        items[i].completed = true;
        if (items[i].prioritized) {
          prioritizeItem();
        }
      } else if (items[i].completed) {
        completedButtons[i].style.setProperty("text-decoration", "none");
        completedButtons[i].style.backgroundColor = "transparent";
        items[i].completed = false;
      }
    };

    completedButtons[i].onclick;

    if (priorityChanged) {
      break;
    }
  }
};

const removeItem = function() {
  itemRemoved = false;

  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].onclick = function() {
      const elementToRemove = elements[i];
      elementToRemove.remove();
      items.splice(i, 1);
      itemRemoved = true;
    };

    removeButtons[i].onclick;

    if (itemRemoved) {
      break;
    }
  }
}

const runModificationFunctions = function() {
  prioritizeItem();
  markAsComplete();
  removeItem();
};

const createItem = function() {
  let input = document.getElementById("enter-input").value;
  if (input === "") {} else {
    let object = {
      task: input,
      prioritized: false,
      completed: false,
      htmlRow: null,
      htmlPriorityButton: null,
      htmlText: null,
      htmlRemoveButton: null
    }

    items.push(object);

    let x = items.indexOf(object);

    items[x].htmlRow = document.createElement("tr");
    items[x].htmlRow.setAttribute("class", "row");
    document.getElementById("task-table").append(items[x].htmlRow);

    items[x].htmlPriorityButton = document.createElement("td");
    items[x].htmlPriorityButton.setAttribute("class", "priority");
    items[x].htmlPriorityButton.innerHTML = "!";
    elements[x].append(items[x].htmlPriorityButton);

    items[x].htmlText = document.createElement("td");
    items[x].htmlText.innerHTML = items[x].task;
    items[x].htmlText.setAttribute("class", "completed");
    elements[x].append(items[x].htmlText);



    items[x].htmlRemoveButton = document.createElement("td");
    items[x].htmlRemoveButton.setAttribute("class", "remove");
    items[x].htmlRemoveButton.innerHTML = "X";
    elements[x].append(items[x].htmlRemoveButton);


  }
  document.getElementById("enter-input").value = "";
};
