export const validateEnv = () => {
    const requiredEnvVars = ['REACT_APP_API_URL'];
    
    const missingVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar]
    );
  
    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      );
    }
  };