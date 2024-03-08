import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {Nav,Button} from 'react-bootstrap'
import "../App.css";
import { addItem } from "../store";
import { useDispatch } from "react-redux";

import {Context1} from './../App'

function Detail(props) {
const dispatch = useDispatch()
 let {inventory} = useContext(Context1) //destructuring

  useEffect(() => {
    // html렌더링 후에 동작. 서버에서 데이터 가져올때, 어려운연산. 재랜더링마다 코드실행
    let a = setTimeout(() => {
      setAlert1(false);
    }, 2000);
    return () => {
      //클리너 펑션. 기존 동작 제거하는 코드 쓰기. useEffect 실행전에 실행됨.
      clearTimeout(a);
    }; //데이터 요청중 재랜더링되면 무한 데이터요청. 그떄 기존 데이터요청삭제. unmount할때 실행.
  }, []); //,[] 실행조건. mount시 1회 코드실행.

 
  const { id } = useParams();
  const findContent = props.photo.find(function (x) {
    return x.id == id;
  });
  const [alert1, setAlert1] = useState(true);
  const [num, setNum] = useState("");
  const [tapState, setTapState] = useState(0);
  
  useEffect(() => {
    if (isNaN(num) === true) {
      alert("정수만 입력가능 합니다.");
    }
  }, [num]);

  return (
    <div className="container">
      {alert1 === true ? (
        <div className="alert alert-warning"> 빨랑 눌러봐라~ </div>
      ) : null}
      
      <div className="row">
        <div className="col-md-6">
          <img
            src={process.env.PUBLIC_URL + "/img/IMG_" + (findContent.id+1) + ".JPG"}
            width="100%"
          />
        </div>
        <div className="col-md-6">
        <input
        onChange={(e) => {
          setNum(e.target.value);
        }}
      />
          <h4 className="pt-5">{findContent.title}</h4>
          <p>{findContent.content}</p>
          <p>{findContent.price}</p>
          <Button variant="warning" onClick={()=>{
            dispatch(addItem({
              id : findContent.id,
              name : findContent.title,
              count : findContent.price
            }))
          }}>장바구니에 담기</Button>{' '}
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="underline" defaultActiveKey="link-1">
      <Nav.Item>
        <Nav.Link onClick={()=>{setTapState(0)}} eventKey="link-1">Option 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={()=>{setTapState(1)}} eventKey="link-2">Option 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={()=>{setTapState(2)}} eventKey="link-3">
        Option 3
        </Nav.Link>
      </Nav.Item>
    </Nav>
          <TapContent tapState={tapState} photo={props.photo} />
    </div>
  );
}

function TapContent({tapState, photo}){

  const [fade, setFade] = useState('')

  useEffect(()=>{   //automatic batching 기능. state 변경함수를 쓸때마다 재랜더링이 아니고 state 변경이 다되고 마지막에 재랜더링해줌.
  let e = setTimeout(()=>{
      setFade('end')
    }, 10)
    return()=>{
    clearTimeout(e)
      setFade('')
    }
  },[tapState])
  
  return(
  <div className={"start " + fade}>
  { [<div> {photo[0].title} </div>, <div> 내용2 </div>, <div> 내용3 </div> ][tapState]}
  </div>
  )

}

export default Detail;
