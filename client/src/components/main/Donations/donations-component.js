import React, { Component } from 'react';
import { Schemes } from './donationSchemes';
import SchemeCard from './schemeCard';
import UnderConstructionHeader from '../Under-construction/under-construction-header';

export default function DonationsComponent() {
  return (
    <div>
      <UnderConstructionHeader />
      <h1 className="Subheading blueH1 text-center">Donation Schemes</h1>
      <div className='CardHolder'>
        {Schemes.map((e) => (
          <SchemeCard image={e.image} name={e.name} desc={e.desc} link={e.link} detail={e.detail} />
        ))}
      </div>
    </div>
  )
}
