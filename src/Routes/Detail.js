import { useParams } from "react-router-dom";

function Detail(props) {

   const {id} = useParams();
   const findContent = props.shoes.find(function(x){
    return x.id == id
   });


    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={process.env.PUBLIC_URL + "/img/IMG_" + [id] + ".JPG"}
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

  export default Detail