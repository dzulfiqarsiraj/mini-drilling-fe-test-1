// import { useState } from "react"

import { useState } from "react"

function App() {
  const data = [
    {
      id: "1",
      name: "Indomie",
      variants: [
        {
          id: "Indomie#01",
          productId: "1",
          name: "Soto",
          price: 3500
        },
        {
          id: "Indomie#02",
          productId: "1",
          name: "Goreng Original",
          price: 4000
        },
        {
          id: "Indomie#03",
          productId: "1",
          name: "Kari Ayam",
          price: 3200
        }
      ]
    },
    {
      id: "2",
      name: "Coca Cola",
      variants: [
        {
          id: "CocaCola#01",
          productId: "2",
          name: "350ml",
          price: 5000
        },
        {
          id: "CocaCola#02",
          productId: "2",
          name: "1 Liter",
          price: 25000
        },
      ]
    },
    {
      id: "3",
      name: "Aqua",
      variants: [
        {
          id: "Aqua#01",
          productId: "3",
          name: "350ml",
          price: 3000
        },
        {
          id: "Aqua#02",
          productId: "3",
          name: "1,5 Liter",
          price: 5000
        },
      ]
    }
   ]

    const [result, setResult] = useState({})
    const [selectedProduct, setSelectedProduct] = useState("")
    const [selectedVariants, setSelectedVariants] = useState([])


    const productHandler = (e) => {
      const productId = e.target.value
      const product = data.find((value) => value.id === productId)
      if(selectedProduct === productId){
        setSelectedProduct("")
        setSelectedVariants([])
      } else {
        setSelectedProduct(productId)
        setSelectedVariants(product.variants.map((variant) => variant.id))
      }
    }

    const variantHandler = (e) => {
      const variantId = e.target.value
      const product = data.find((product) => product.variants.find((variant) => variant.id === variantId))
      const variant = product.variants.find((variant) => variant.id === variantId)

      // if(!selectedVariants.includes(variantId)){
      //   setSelectedVariants([...selectedVariants, variantId])
      //   setSelectedProduct(variant.productId)
      // } else {
      //   setSelectedVariants(selectedVariants.filter((variant) => variant !== variantId))
      // }

      if(!selectedVariants.includes(variantId)){
        setSelectedProduct(variant.productId)
        setSelectedVariants([...selectedVariants, variantId])
      } else {
        setSelectedVariants(selectedVariants.filter((variant) => variant !== variantId))
      }
    }

    const submitHandler = (e) => {
      e.preventDefault()
      const product = data.find((value) => value.id === selectedProduct)
      setResult({
        id: product?.id,
        name: product?.name,
        variants: product?.variants?.filter((variant) => selectedVariants.includes(variant.id))
      })
      console.log(selectedProduct)
      console.log(selectedVariants)
    }

    const resetHandler = () => {
      setSelectedProduct("")
      setSelectedVariants([])
      setResult({})
    }

  return (
    <>
      <main className="flex flex-row w-screen h-screen justify-center items-center">
        <div className="flex flex-row justify-center items-center gap-5">
          <div className="">
            <form onReset={resetHandler} onSubmit={submitHandler} className="flex flex-col border border-black rounded-md p-5">
              {data.map((product) => (
                <div key={product.id}>
                    <label htmlFor={product.id} className="flex flex-row text-md gap-3">
                      <input 
                        id={product.id} 
                        type="checkbox" 
                        name={product.name}
                        value={product.id}
                        onChange={productHandler}
                        checked={selectedProduct === product.id}
                        className="peer"
                      />
                      <p>{product.name}</p>
                    </label>
                    {product.variants.map((variant) => (
                      <div key={variant.id} className="flex flex-row gap-3 pl-3">
                        <label htmlFor={variant.id} className="flex flex-row text-md gap-3">
                          <input 
                            id={variant.id} 
                            type="checkbox" 
                            name={variant.name}
                            value={variant.id}
                            onChange={variantHandler}
                            checked={selectedVariants.includes(variant.id)}
                          />
                          <p>{variant.name}</p>
                        </label>
                      </div>
                    ))}
                </div>
              ))}
              <div className="flex-1 flex flex-row gap-3 justify-evenly mt-3">
                <button type="reset" className="bg-slate-500 py-2 px-3 rounded-md">Reset</button>
                <button type="submit" className="bg-teal-500 py-2 px-3 rounded-md">Submit</button>
              </div>
            </form>
          </div>
          <div className="flex flex-col bg-gray-800 w-80 h-48 self-start rounded-md p-5 gap-3 justify-between">
              <h1 className="font-bold text-white">Result :</h1>
              <div className="flex flex-col gap-3">
                {result?.variants?.map((value, index) => (
                  <div key={index} className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3">
                      <p className="text-output">{result?.name},</p>
                      <p className="text-output">{value?.name}</p>
                    </div>
                    <p className="text-output">Rp {value?.price.toLocaleString("id")},-</p>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
