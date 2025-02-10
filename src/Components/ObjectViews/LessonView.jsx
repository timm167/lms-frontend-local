import React, { useState } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Button,
} from '@mui/material';
import { useAppContext } from '../../AppContext';
import { CustomContainer } from '@shared-theme/customDesign';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function LessonView() {
    const [activeTab, setActiveTab] = useState('info');
    const { viewObject, lastViewObject, setViewObject, setViewType} = useAppContext();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleBack = () => {
        setViewObject(lastViewObject);
        setViewType('courses')
    }


    return (
        <CustomContainer>
            <Box sx={{ width: '100%', fontSize: '1.5rem', position: 'relative', paddingTop: '50px' }}>
                <Button
                    variant="text"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        fontSize: '0.7rem',
                    }}
                    onClick={() => handleBack()}
                >
                    COURSE
                </Button>
                <Typography variant="h4" sx={{ mb: 2, color: 'black' }} onClick={() => console.log(viewObject.video_url)}>
                    {viewObject.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 4, color: 'black' }}>
                    Lesson Number: {viewObject.lesson_no}
                </Typography>


                {/* Tabs for Navigation */}
                <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                    <Tab label="Lesson Info" value="info" sx={{ '&:focus': { outline: 'none' } }} />
                    <Tab label="Video" value="video" sx={{ '&:focus': { outline: 'none' } }} />
                </Tabs>

                {activeTab === 'info' && (
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>
                            Content
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, color: 'black' }}>
                            {viewObject.content}
                        </Typography>
                    </Box>
                )}

                {activeTab === 'video' && viewObject.video_url && (
                    <Box >
                        <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>
                            Video
                        </Typography>
                        <iframe
                            width="100%"
                            height="400"
                            src={viewObject.video_url}
                            title={viewObject.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </Box>
                )}
            </Box>
        </CustomContainer>
    );
}

export default LessonView;