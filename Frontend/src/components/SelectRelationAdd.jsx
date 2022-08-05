import CustomSelectInput from './CustomSelectInput'
import Peticion from '../helpers/Peticiones'
import React, { useState } from 'react'
import Select from 'react-select'

const SelectRelationAdd = ({
    setSelectedOptions,
    selectedOptions,
    endPoint,
    label
}) => {
    const [loading, setLoading] = useState(false)

    const dataProves = new Peticion(endPoint).getData(loading)
    const newData = []
    if (dataProves !== null) {
        Object.values(dataProves.response).forEach(item => {
            newData.push({
                value: item.nombre,
                label: item.nombre,
                key: item.id
            })
        })
    }

    return (
        <Select
            placeholder={label}
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            isMulti
            name="proves"
            value={selectedOptions}
            onChange={setSelectedOptions}
            options={newData}
            setLoading={setLoading}
            loading={loading}
        />
    )
}
export default SelectRelationAdd

