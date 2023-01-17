import { useParams } from "react-router-dom"

export const ShopPage = () => {

    const { shopId } = useParams();

    return (
        <div>ShopPage { shopId }</div>
    )
}