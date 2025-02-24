import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";

interface IParams {
    productId: string;
}

const Product = async (props: {params: Promise<IParams>}) => {
    const params = await props.params;
    // console.log("params", params); // Server Side Component => Check the Server Console to view it 
    // but not the browser console!

    const product = products.find((item) => item.id === params.productId);

    return ( 
        <div className="p-8">
            <Container>
                <ProductDetails product = {product} />
                <div className="flex flex-col mt-20 gap-4">
                    <div>Add Rating</div>
                    <ListRating product = {product} />
                </div>
            </Container>
        </div>
     );
}
 
export default Product;