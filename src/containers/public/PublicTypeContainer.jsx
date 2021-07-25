import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DataLoader from '../../components/loader/DataLoader';
import { useTypeAction } from '../../hooks/useTypeAction';
import PublicType from '../../pages/public/PublicType';

const PublicTypeContainer = () => {
    const { types, loading, selectedType } = useSelector(state => state.type); 
    // const { devices } = useSelector(state => state.type); 
    const { getTypes, getDevices, setSelectedType } = useTypeAction();
    const selectedBrand = JSON.parse(localStorage.getItem('selected_brand'));

    useEffect(() => {
        getDevices(selectedType?.id, selectedBrand?.id, 1, 10);
    }, [])

    useEffect(() => {
        getTypes();
    }, [])

    return <>
        <PublicType 
            types={types} setSelectedType={setSelectedType} loading={loading}
        />
    </>
}

export default PublicTypeContainer
