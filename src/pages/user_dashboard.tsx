// Dashboard.tsx
import React from "react";
import { Grid, Card, CardContent, Typography, Button, LinearProgress, Chip, Box, Badge } from "@mui/material";

// Sample user data
const user = {
  name: "Royal",
  currentPlan: "Pro",
  usage: 65,
  quota: 100,
  nextPayment: "2025-09-20",
  amountDue: 499,
  subscriptionStatus: "Active", // Active / Paused / Cancelled
  notifications: 3,
  recommendations: ["Premium Plus", "Enterprise"]
};

// Components

const WelcomeHeader = ({ name }: { name: string }) => (
  <Typography variant="h4" gutterBottom>
    Welcome, {name}!
  </Typography>
);

const CurrentPlanCard = ({ plan }: { plan: string }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Current Plan</Typography>
      <Typography variant="body1">{plan}</Typography>
    </CardContent>
  </Card>
);

const QuickActionButtons = () => (
  <Box display="flex" gap={2}>
    <Button variant="contained" color="primary">Upgrade</Button>
    <Button variant="outlined" color="secondary">Downgrade</Button>
    <Button variant="text" color="error">Cancel</Button>
  </Box>
);

const RecommendationsWidget = ({ recommendations }: { recommendations: string[] }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Recommended Plans</Typography>
      <Box mt={1} display="flex" gap={1}>
        {recommendations.map((rec, idx) => (
          <Chip key={idx} label={rec} color="info" />
        ))}
      </Box>
    </CardContent>
  </Card>
);

const NotificationCenter = ({ count }: { count: number }) => (
  <Badge badgeContent={count} color="error">
    <Button variant="outlined">Notifications</Button>
  </Badge>
);

const UsageProgressBar = ({ usage, quota }: { usage: number; quota: number }) => (
  <Box>
    <Typography variant="body1">Usage: {usage} / {quota} GB</Typography>
    <LinearProgress variant="determinate" value={(usage / quota) * 100} />
  </Box>
);

const BillingStatusCard = ({ nextPayment, amount }: { nextPayment: string; amount: number }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Next Payment</Typography>
      <Typography variant="body1">{nextPayment} - ₹{amount}</Typography>
    </CardContent>
  </Card>
);

const SubscriptionStatusBadge = ({ status }: { status: string }) => {
  let color: "success" | "warning" | "error" = "success";
  if (status === "Paused") color = "warning";
  if (status === "Cancelled") color = "error";

  return <Chip label={status} color={color} />;
};

// Main Dashboard
export default function Dashboard() {
  return (
    <Box p={3}>
      <WelcomeHeader name={user.name} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CurrentPlanCard plan={user.currentPlan} />
        </Grid>

        <Grid item xs={12} md={8}>
          <QuickActionButtons />
        </Grid>

        <Grid item xs={12} md={6}>
          <RecommendationsWidget recommendations={user.recommendations} />
        </Grid>

        <Grid item xs={12} md={6}>
          <NotificationCenter count={user.notifications} />
        </Grid>

        <Grid item xs={12} md={6}>
          <UsageProgressBar usage={user.usage} quota={user.quota} />
        </Grid>

        <Grid item xs={12} md={6}>
          <BillingStatusCard nextPayment={user.nextPayment} amount={user.amountDue} />
        </Grid>

        <Grid item xs={12}>
          <SubscriptionStatusBadge status={user.subscriptionStatus} />
        </Grid>
      </Grid>
    </Box>
  );
}
