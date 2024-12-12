import React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { showAlert, hideAlert } from "../redux/slices/alertSlice";

export default function SimpleAlert() {
  const alertData = useSelector((state: RootState) => state.alert);

  const dispatch = useDispatch<AppDispatch>();

  if (alertData?.visible) {
    const timer = setTimeout(() => {
      dispatch(hideAlert());
      clearTimeout(timer);
    }, 3000);
  }

  return alertData?.visible ? (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity={alertData?.type}>
      {alertData.message}
    </Alert>
  ) : null;
}
