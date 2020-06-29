import React from 'react'
import './BankAccountCard.less';

const BankAccountCard = ({ bankData, openModal }) => {
    return (
        <div className="BankAccountCard">
            <h2>Bank Accounts <span>( for withdrawal )</span></h2>
            <div className="card">
                <div className="left">
                    <img src={require('../../../../assets/images/png/bank-building.png')} alt="bank-building" />
                    <h4>{bankData.bankName}</h4>
                </div>
                <div className="right">
                    <h5>{bankData.accountName}</h5>
                    <h5>{bankData.accountNumber}</h5>
                    <h5>{bankData.ifsc}</h5>
                </div>
                <div className="edit" onClick={openModal}><img src={require('../../../../assets/images/png/pencil-edit-button.png')} alt="Pencil" /></div>
            </div>
        </div >
    )
}

export default BankAccountCard;
