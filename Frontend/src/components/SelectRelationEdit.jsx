/* eslint-disable*/
import CustomSelectInput from '../components/CustomSelectInput'
import Peticion from '../helpers/Peticiones'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useLocation } from 'react-router-dom'

const SelectRelationEdit = ({
    setSelectedOptions,
    selectedOptions,
    endPointCurrent,
    endPoint,
    label,
    valor
}) => {
    const [loading, setLoading] = useState(false)
    const url = useLocation();
    const id = url.pathname.split("/").pop();
    const dataProves = new Peticion(endPointCurrent).getData(loading)
    const data = new Peticion(`${endPoint}/${id}`).getDataId()
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
    // const ids = 'cfgAntibiogramsAtbs'
    const currentData = []
    useEffect(() => {
        if (data != null) {
            const keys = Object.keys(data.response).pop()
            Object.values(data.response[keys]).forEach(item => {

                const keys = Object.keys(item).pop()
                currentData.push({
                    value: item[keys].nombre,
                    label: item[keys].nombre,
                    key: item[keys].id
                })
            })
        }
        setSelectedOptions(currentData)
        //   // eslint-disable-next-line
    }, [data])
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
export default SelectRelationEdit
