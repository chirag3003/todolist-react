import React, { useState } from "react";
import List from "./List.jsx";
import ListPageHeader from "./ListPageHeader";

function App() {
	let [list, changeList] = useState([
		"Note This List cannot be saved",
		"Click on a list item to remove it",
	]);

	let addList = (list, pos) => {
		return <List key={pos} value={list} pos={pos} remover={remItem} />;
	};

	let remItem = (pos) => {
		changeList(function (prevList) {
			return prevList.filter((item, index) => {
				return index !== pos;
			});
		});
	};

	let [inputVal, changeInputVal] = useState("");

	let changeValue = (event) => {
		let newVal = event.target.value;
		changeInputVal(newVal);
	};
	let modifyList = (evt) => {
		evt.preventDefault();
		let newItem = inputVal;
		changeInputVal("");
		changeList((previousList) => {
			return [...previousList, newItem];
		});
	};

	return (
		<div className='container'>
			<ListPageHeader />
			<form className='form'>
				<input
					onChange={changeValue}
					type='text'
					value={inputVal}
					// onClick={modifyList}
				/>
				<button type='submit' onClick={modifyList}>
					<span>Add</span>
				</button>
			</form>
			<div>
				<ul>{list.map(addList)}</ul>
			</div>
		</div>
	);
}

export default App;
