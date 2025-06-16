import React from 'react'
import IdCardForm from '../components/IdCardForm';
import IdCard from '../components/IdCard';

const IdCardPage = ({generatedCard, setGeneratedCard}) => {
  return (
    <div>
        <main>
        <IdCardForm onCardGenerated={setGeneratedCard} />
        {generatedCard && <IdCard cardData={generatedCard} />}
      </main>
    </div>
  )
}

export default IdCardPage;