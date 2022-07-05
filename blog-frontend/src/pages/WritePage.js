import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../components/write/EditorContainer';
import WriteActionButtons from '../components/write/WriteActionButtons';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
    return (
        <>
            <Responsive>
                <Helmet>
                    <title>글 작성하기 - REACTERS</title>
                </Helmet>
                <EditorContainer />
                <TagBoxContainer />
                <WriteActionButtonsContainer />
            </Responsive>
        </>
    );
}

export default WritePage;