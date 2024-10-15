import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Container , Row , Col} from 'react-bootstrap/';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../rtk/slices/productsSlice';
import { addToCart } from '../rtk/slices/cartSlice';
import './Products.css';

function Products(){
    const products = useSelector((state)=> state.products);
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch]) 

    return(
        <Container className='py-5'>
            <h1 className="text-center mb-5 mt-5">Our Products</h1>
            <Row className='gy-4'>
                {products.map((product)=>{
                    return (
                        <Col key={product.id} xs={12} md={6} lg={4} className="d-flex">
                            <Card className="product-card flex-fill h-100">
                            <Card.Img className="product-image" variant="top" src={product.image} />
                            <Card.Body className="d-flex flex-column">
                            <Card.Title className="product-title">{product.title}</Card.Title>
                            <Card.Text className="product-description">{product.description.substring(0,60)}...</Card.Text>
                            <Card.Text className="product-price"><strong>{product.price}$</strong></Card.Text>
                            <Button className='mt-auto' variant="primary" onClick={()=> dispatch(addToCart(product))}>Add To Cart</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
                
            </Row>
        </Container>
    )
}

export default Products;