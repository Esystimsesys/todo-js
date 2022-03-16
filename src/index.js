import "./styles.css";

//ADDボタンクリック時に呼ばれる関数
const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化
  const inputText = document.getElementById("add-text").value;
  if (!inputText) {
    return;
  }
  document.getElementById("add-text").value = "";

  //未完了リストに要素を追加
  addItemToIncompleteList(inputText);
};

//COMPLETEボタンクリック時に呼ばれる関数
const onClickComplete = (button) => {
  //未完了リストから要素を削除
  deleteItem("incomplete-list", button.parentNode);
  //完了リストに要素を追加
  addItemToCompleteList(button.parentNode.firstElementChild.innerText);
};

//DELETEボタンクリック時に呼ばれる関数
const onClickUndo = (button) => {
  //完了リストから要素を削除
  deleteItem("complete-list", button.parentNode);
  //未完了リストに要素を追加
  addItemToIncompleteList(button.parentNode.firstElementChild.innerText);
};

//完了リストにTODOを追加する関数。
const addItemToCompleteList = (todoText) => {
  //追加する要素を作成
  const div = createTodoTextElement(todoText);

  const undoButton = document.createElement("button");
  undoButton.innerText = "UNDO";
  undoButton.addEventListener("click", () => onClickUndo(undoButton));

  div.appendChild(undoButton);

  //完了リストに追加
  document.getElementById("complete-list").appendChild(div);
};

//未完了リストにTODOを追加する関数
const addItemToIncompleteList = (todoText) => {
  //追加する要素を作成
  const div = createTodoTextElement(todoText);

  const completeButton = document.createElement("button");
  completeButton.innerText = "COMPLETE";
  completeButton.addEventListener("click", () =>
    onClickComplete(completeButton)
  );

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "DELETE";
  deleteButton.addEventListener("click", () => {
    //未完了リストから要素を削除
    deleteItem("incomplete-list", deleteButton.parentNode);
  });

  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

//テキストのみ（ボタン以外）の要素を作成する関数
const createTodoTextElement = (text) => {
  //divタグを作成
  const div = document.createElement("div");
  div.className = "list-row";

  //liタグを作成
  const li = document.createElement("li");
  li.innerText = text;

  div.appendChild(li);
  return div;
};

//親要素（id指定）から特定の要素を削除する関数
const deleteItem = (parentId, targetElement) => {
  document.getElementById(parentId).removeChild(targetElement);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
