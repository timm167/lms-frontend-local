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

function AssignmentView() {
    const [activeTab, setActiveTab] = useState('info');
    const { viewObject, setViewObject, setViewType, lastViewObject } = useAppContext();

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
                <Typography variant="h4" sx={{ mb: 2, color: 'black' }}>
                    {viewObject.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 4, color: 'black' }}>
                    Due Date: {new Date(viewObject.due_date).toLocaleString()}
                </Typography>

                {/* Tabs for Navigation */}
                <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                    <Tab label="Assignment Info" value="info" sx={{ '&:focus': { outline: 'none' } }} />
                    <Tab label="Scores" value="scores" sx={{ '&:focus': { outline: 'none' } }} />
                </Tabs>

                {activeTab === 'info' && (
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>
                            Description
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, color: 'black' }}>
                            {viewObject.description}
                        </Typography>
                    </Box>
                )}

                {activeTab === 'scores' && (
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>
                            Scores
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, color: 'black' }}>
                            Max Score: {viewObject.max_score}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, color: 'black' }}>
                            Pass Score: {viewObject.pass_score}
                        </Typography>
                    </Box>
                )}
            </Box>
        </CustomContainer>
    );
}

export default AssignmentView;