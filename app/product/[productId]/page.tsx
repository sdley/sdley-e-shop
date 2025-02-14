import Container from "@/app/components/Container";
import { product } from "@/utils/product";
import ProductDetails from "./ProductDetails";

interface IParams {
    productId: string;
}

const Product = ({ params }: {params: IParams}) => {
    console.log("params", params); // Server Side Component => Check the Server Console to view it but not the browser console!

    return ( 
        <div className="p-8">
            <Container>
                <ProductDetails product = {product} />
            </Container>
        </div>
     );
}
 
export default Product;