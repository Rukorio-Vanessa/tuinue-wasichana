import logo from './logo.svg';
import './App.css';
import LandingPage from './views/landing-page/LandingPage';
import DonationPageMpesa from './views/donations/donation-page-mpesa/DonationPageMpesa';
import DonationPageCreditCard from './views/donations/donation-page-credit-card/DonationPageCreditCard';
import DonationPagePayPal from './views/donations/donation-page-paypal/DonationPagePaypal';
import AdministratorPage from './views/administrator-page/AdministratorPage';
import CharityApplication from './views/charity-application/CharityApplication';
import { useDispatch } from 'react-redux';
import { fetchCharities } from './features/charity/charitiesSlice';
import store from './app/store';
import { useEffect } from 'react';
import { selectCharities } from './features/charity/charitiesSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchCharities())
  },[])
  let char = useSelector(selectCharities)
  console.log(char)

  return (
    <>
      <LandingPage />
      <DonationPageCreditCard />
      <DonationPageMpesa />
      <DonationPagePayPal />
      <AdministratorPage />
      <CharityApplication />
    </>
  );
}

export default App;
