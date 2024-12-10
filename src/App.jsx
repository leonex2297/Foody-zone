import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./Components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
const[data,setData]=useState(null)
const[filterData,setFilterData]=useState(null);
const[loading,setLoading]=useState(true)
const[error,setError]=useState(null)
const[selectedButton,setSelectedButton]=useState("all")


  const fetchFoodData=async()=>{
    try{
    const response=await fetch(BASE_URL);
    const json= await response.json();
    console.log(json);
    setData(json);
    setFilterData(json);
    setLoading(false);
    }
    catch(error){
      setError(`Unabel to fetch data.`);
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchFoodData();
  },[])

  const searchFood=(e)=>{
    const searchValue=e.target.value;
    console.log(searchValue);
    if(searchValue===""){
      setFilterData(null);
    }
    const filter= data.filter((food)=>food.name.toLowerCase().includes(searchValue.toLowerCase()))
    setFilterData(filter);
  }

  const filterFood=(type)=>{
    if(type==="all"){
      setFilterData(data);
      setSelectedButton("all");
      return;
    }
    const filter= data.filter((food)=>food.type.toLowerCase().includes(type.toLowerCase()))
    setFilterData(filter);
    setSelectedButton(type);
  }

  const filterBtns=[
    {
      name:"All",
      type:"all",
    },

    {
      name:"Breakfast",
      type:"breakfast",
    },
    {
      name:"Lunch",
      type:"lunch",
    },
    {
      name:"Dinner",
      type:"dinner",
    }
  ]
  // if(!loading)return;
  if(loading){
    return(
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  // if(!error)return;
  if(error){
    return(
      <div>
        <h2>{error}</h2>
      </div>
    )
  }
  return (
  <>
  <Container>
    <TopContainer>
      <div className="Logo">
        <img src="/Logo.svg" alt="logo"/>
      </div>
      <div className="search">
        <input onChange={searchFood} type="search" placeholder="Search Food"/>
      </div>
    </TopContainer>

    <FilterContainer>
      {
        filterBtns.map(({name,type})=>{
          return <Button isSelected={selectedButton===type} key={name} onClick={()=>filterFood(type)}>{name}</Button>
        })
      }
    {/* <Button onClick={()=>filterFood("all")}>All</Button>
    <Button onClick={()=>filterFood("breakfast")}>Breakfast</Button>
    <Button onClick={()=>filterFood("lunch")}>Lunch</Button>
    <Button onClick={()=>filterFood("dinner")}>Dinner</Button> */}
    </FilterContainer>

    
  </Container>
  <SearchResult  data={filterData}/>
  </>
  
  ) 
};

export default App;

export const Container=styled.div`
max-width: 1200px;
margin: 0 auto;
`;
const TopContainer=styled.section`
height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;

.search{
  input{
  background-color: transparent;
  border: 1px solid red;
  color: white;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  padding: 0 10px;
  &::placeholder{
    color:white;
  }
  }
}
@media(0 < width < 600px){
  flex-direction: column;
  height: 120px;
}
`;
const FilterContainer=styled.section`
display: flex;
justify-content: center;
padding-bottom: 40px;
gap:12px
`;
export const Button=styled.button`
background-color:${({isSelected})=> (isSelected) ? "#de1111": "#ff4343"};
outline: 1px solid ${({isSelected})=> (isSelected) ? "white": "#ff4343"};
border-radius: 5px;
padding: 6px 12px;
border: none;
color: white;
cursor: pointer;
&:hover{
  background-color: #de1111;
}
`;
