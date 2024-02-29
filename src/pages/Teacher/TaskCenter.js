import { AppLayout } from 'src/components/AppLayout/AppLayout';
import { Grid } from '@mui/material';
import LearningCard from 'src/components/Cards/LearningCard';
import Footer from 'src/components/AppLayout/Footer';

// todo: gotta move this to comment view
import '../Assignment/DailyGoal.css';
import '../Home/Learning.css';
import { TaskCenterData } from 'src/pages/Teacher/TaskCenterData';
import { useAuth } from 'src/navigation/Auth/ProvideAuth';
import { LearningCenterData } from 'src/pages/Home/LearningCenterData';

function TaskCenter() {
  const { user, role } = useAuth();
  return (
    <AppLayout
      showSubHeader
      subHeaderLabel="Back to Previous Page"
      isPracticing
    >
      {/* TODO: find a better background, the tiny square is not dense enough for some pages */}
      <div className="cool-bg">
        <Grid container className="assignment-container">
          <div className="assignment-section">
            <h1>Task Center</h1>
            <h1>Class A106 - 1</h1>
          </div>
        </Grid>
        <div className="learn-container theme-text">
          <Grid
            container
            spacing={{ xs: 2, sm: 8, md: 8 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {TaskCenterData.map((item, index) => {
              if (item.name === 'joinSchool' && user.orgId) {
                return null; // show join school if the user is not assigned to any
              }

              return (
                <Grid
                  key={`Card ${index}`}
                  item
                  xs={4}
                  sm={4}
                  md={6}
                >
                  <LearningCard
                    label={item.title}
                    to={item.path}
                    isActive={item.isActive}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
      <Footer />

    </AppLayout>
  );
}

export default TaskCenter;
