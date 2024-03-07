import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Detail(props) {
 
  const { id } = useParams();
  const findContent = props.photo.find(function (x) {
    return x.id == id;
  });
  console.log(findContent)
  const [alert, setAlert] = useState(true);
  const [num, setNum] = useState("");
  useEffect(() => {
    // html렌더링 후에 동작. 서버에서 데이터 가져올때, 어려운연산. 재랜더링마다 코드실행
    let a = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      //클리너 펑션. 기존 동작 제거하는 코드 쓰기. useEffect 실행전에 실행됨.
      clearTimeout(a);
    }; //데이터 요청중 재랜더링되면 무한 데이터요청. 그떄 기존 데이터요청삭제. unmount할때 실행.
  }, []); //,[] 실행조건. mount시 1회 코드실행.

  
  useEffect(() => {
    if (isNaN(num) == true) {
      alert("정수만 입력가능 합니다.");
    }
  }, [num]);

  return (
    <div className="container">
      {alert == true ? (
        <div className="alert alert-warning"> 빨랑 눌러봐라~ </div>
      ) : null}
      <input
        onChange={(e) => {
          setNum(e.target.value);
        }}
      />
      <div className="row">
        <div className="col-md-6">
          <img
            src={process.env.PUBLIC_URL + "/img/IMG_" + (id+1) + ".JPG"}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findContent.title}</h4>
          <p>{findContent.content}</p>
          <p>{findContent.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
