interface IParams {
    productId: string;
}

const Product = ({ params }: {params: IParams}) => {
    console.log("params", params); // Server Side Component => Check the Server Console to view it but not the browser console!

    return ( 
        <div>
            <h1>Product Page</h1>
        </div>
     );
}
 
export default Product;