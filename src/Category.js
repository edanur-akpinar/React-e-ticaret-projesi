import { Component } from "react";
import { Button} from "reactstrap";
import "../src/Category.css";

export default class Category extends Component {

    render() {
        return (
            <div className="Category d-flex justify-content-between mb-5 mt-3" >
                {
                    this.props.category.map((cate) => (
                        <Button className="lgi" onClick={() => this.props.getCategory(cate)} key={cate.id}>
                            {cate.categoryName}
                        </Button>
                    ))
                }
            </div>
        );
    }
}
