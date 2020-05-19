import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";

const DatePicker = (props) => {
  console.log();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>Please select off-order dates: </Text>
      </View>
      <Calendar
        onDayPress={props.onDayPress}
        firstDay={1}
        minDate={moment().add(1,'days').format('YYYY-MM-DD')}
        markedDates={props.markedDates.reduce(
          (value, index) => (
            (value[index] = { selected: true, color: "#32d" }), value
          ),
          {}
        )}
        markingType="simple"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
});

export default DatePicker;
