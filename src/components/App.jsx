import React, {useEffect, useState} from "react";
import List from "./List.jsx";
import ListPageHeader from "./ListPageHeader";
import axios from "axios"
import Axios from "../Helpers/Axios";

function App() {
	let [list, changeList] = useState([
	]);

	let addList = (list, pos) => {
		return <List key={pos} value={list} id={list._id} pos={pos} remover={remItem} />;
	};

	let remItem = (pos,id) => {
		axios.delete("http://localhost:5000/",{data:{id}})
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
		Axios.post("/",{title:newItem}).then(({data:{InsertedID}}) => {
			changeList((previousList) => {
				return [...previousList, {title:newItem,_id:InsertedID}];
			});
		}).catch(err => console.error(err))
	};
	useEffect(() => {
			Axios.get("/list").then((response) => {
				if(response.data)
				changeList(old => {
					return [...old,...response.data]
				})
			})
	}, []);

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
