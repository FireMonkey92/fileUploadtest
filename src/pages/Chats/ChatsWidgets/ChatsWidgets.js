import React from 'react';

import './ChatsWidgets.less';

const ChatsWidgets = ({ item }) => {
    return (
        <div className="flex-row single-chat-list">
            <img src={require('../../../assets/images/required/blank-profile-picture.png')} alt="pic" />
            <div className="flex-column space-between">
                <div className="flex ">
                    <div className="name">
                        {item.name}
                    </div>
                    <div className="time">
                        {item.time}
                    </div>
                </div>
                <div className="message">
                    {item.message}
                </div>
            </div>
        </div>
    )
}
export default ChatsWidgets;