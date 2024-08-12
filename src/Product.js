import { Component } from "react";
import { Button } from "reactstrap";
import "../src/Product.css";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";

export default class Product extends Component {
    render() {
        return (
            <div className="Product d-flex">

                {
                    this.props.products.map(product => (
                        <Card
                            className="PCard"
                            style={{
                                width: '15rem',
                                textAlign: "center",
                                margin: "5px",

                            }}
                        >

                            <div>
                                <CardBody key={product.id}>
                                    <div>
                                        <img
                                            alt="Sample"
                                            src={product.resim}
                                            width="150px"
                                            height="250px"
                                        />
                                    </div>
                                    <div>
                                        <CardTitle tag="h5">
                                            {product.productName}
                                        </CardTitle>
                                    </div>
                                    <div>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6"
                                        >
                                            {product.unitsInStock}
                                        </CardSubtitle>
                                    </div>
                                    <div>
                                        <CardText style={{ color: "green", fontSize: "25px" }}>
                                            {product.unitPrice}
                                        </CardText>
                                    </div>
                                    <div>
                                        <CardText>
                                            {product.marka}
                                        </CardText>
                                    </div>

                                    <div>
                                        <Button onClick={() => this.props.getClickButton(product)}>
                                            Sepete Ekle
                                        </Button>
                                    </div>
                                </CardBody>
                            </div>

                        </Card>
                    ))
                }
            </div>
        );
    }
}   