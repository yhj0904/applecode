import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import{changeName,increase} from "./../store/userSlice"
import {addCount} from './../store'

function Cart() {
  const state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch()
  console.log(state.user)
  // Redux props 없이 state 공유가능 .js에 데이터보관
  // 외부라이브러리임. 공유가 필요없으면 store에 저장하지말자.
  return (
    <div>
      <h6>{state.user.name} {state.user.age} 의 장바구니</h6>
        <butten onClick={()=>{dispatch(increase(100))}} >+</butten>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>수량</th>
            <th></th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {state.sample.map((a, i) => {
            return <CartList sample={state.sample[i]} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

function CartList(params) {
  let dispatch = useDispatch()
 return( <tr key={params.sample.id}>
    <td>{params.sample.id}</td>
    <td>{params.sample.name}</td>
    <td> {params.sample.count}</td>
    <td><button onClick={()=>{
      dispatch((addCount(params.sample.id)))
    }}>+</button></td>
    <td>@mdo</td>
  </tr>
);}

export default Cart;
