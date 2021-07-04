{/* <Tab
heading="Pending"
tabStyle={{ backgroundColor: "#0077b5" }}
activeTabStyle={{ backgroundColor: "#0072AD" }}
>
<View style={styles.ListContainer}>
  <FlatList
    data={this.state.clearingLoans}
    renderItem={({ item }) => {
      return (
        <LoanPaidCard
          id={item.id}
          amount={item.amount}
          number={item.number}
          days={this.getRemainingDays(item.due_date.split(" ")[0])}
          due_date={item.due_date.split(" ")[0]}
          progress={this.getPercentage(
            item.date.split(" ")[0],
            item.due_date.split(" ")[0]
          )}
          baseurl={this.baseurl}
          navigation={this.navigation}
        />
      );
    }}
    refreshControl={
      <RefreshControl
        //refresh control used for the Pull to Refresh
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}
      />
    }
    keyExtractor={item => item.id}
  />
</View>
</Tab>
<Tab
heading="Paid"
tabStyle={{ backgroundColor: "#0077b5" }}
activeTabStyle={{ backgroundColor: "#0072AD" }}
>
<View style={styles.ListContainer}>
  <FlatList
    data={this.state.paidLoans}
    renderItem={({ item }) => {
      return (
        <LoanPaidCard
          id={item.id}
          amount={item.amount}
          number={item.number}
          days={this.getRemainingDays(item.due_date.split(" ")[0])}
          due_date={item.due_date.split(" ")[0]}
          progress={this.getPercentage(
            item.date.split(" ")[0],
            item.due_date.split(" ")[0]
          )}
          baseurl={this.baseurl}
          navigation={this.navigation}
        />
      );
    }}
    refreshControl={
      <RefreshControl
        //refresh control used for the Pull to Refresh
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}
      />
    }
    keyExtractor={item => item.id}
  />
</View>
</Tab>  */}

// ==================================
// import React, { Component, useState, useEffect } from "react";
// import { StyleSheet } from "react-native";
// import {
//   Card,
//   CardItem,
//   Thumbnail,
//   Text,
//   Button,
//   Icon,
//   Left,
//   Body,
//   Right,
//   Item,
//   View,
//   CheckBox
// } from "native-base";
// import ProgressBar from "./ProgressBar";
// import VerticalDivider from "./VerticleDivider";
// import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';  
// import RoundCheckbox from 'rn-round-checkbox';
// //name number call button modal

// const LoanCard = ({
//   progress,
//   amount,
//   id,
//   number,
//   days,
//   due_date,
//   navigation,
//   baseurl,
//   checkcondition,
//   checkedinvoiceId
// }) => {
//   const [checked, setChecked] = useState(false);
//  console.log(parseInt(checkcondition)+"checked 123")
//  //get a variable in 0 and 1 from make payment button mp button clicked send 1 cancel clicked send 0
//   useEffect(()=>{
//     console.log("useeffect is called now what")
//     parseInt(checkcondition)?
//      checkfunction()
//     :null
//   }
//   ,[checkcondition],[checked]);
//   const checkfunction = async () => {
//     await setChecked(!checked);

//     checkedinvoiceId(checked, { id }, { amount });
//   };
//   return (
//     <View style={{ flexDirection: "row", flex: 1 }}>
//       <View style={{ flex: 1 }}>
//         <Card
//           button
//           style={[
//             styles.CardStyle,
//             // { backgroundColor: (parseInt(checkcondition) ? (checked ? "#55a5e0" : "white"):"white" )}
//            // { backgroundColor: ( (checked ? "#DCDCDC" : "white"))}
//             { backgroundColor:  "white"}
//           ]}
//         >
//           <CardItem
//             button
//             onPress={() => {(Boolean(
//               JSON.parse(JSON.stringify({ checkcondition })).checkcondition
//             ))?( checkfunction()):(
//               navigation.navigate("LoanDetails", {
//                 progress: progress,
//                 amount: amount,
//                 id: id,
//                 number: number,
//                 days: days,
//                 due_date: due_date,
//                 baseurl: baseurl
//               })
//             )
             
//             }}
//             style={[
//               styles.SubContainer,
//               // { backgroundColor: (parseInt(checkcondition) ? (checked ? "#55a5e0" : "white"):"white" )}
//             //  { backgroundColor: (checked ? "#DCDCDC" : "white")}
//             { backgroundColor:  "white"}
//             ]}
//           >
//             <View style={styles.MainContentContainer}>
//               <View style={styles.HeadingContainer}>
//                 <Icon style={styles.Icon} name="rupee" type="FontAwesome" />
//                 <View
//                   style={{
//                     flex: 1,
//                     flexDirection: "column",
//                     alignContent: "flex-start"
//                   }}
//                 >
//                   <Text style={styles.CardMainText}>{amount}</Text>
//                   <Text style={styles.CardSomeText}>invoice no: {number}</Text>
//                 </View>
//                 <Text style={styles.CardSubText}>Due Date: {due_date}</Text>
//               </View>
//               <View style={styles.ProgressBar}>
//                 <ProgressBar progress={progress} />
//               </View>
//             </View>
//             {Boolean(
//               JSON.parse(JSON.stringify({ checkcondition })).checkcondition
//             ) && (
//               <View style={{ flex: 1 / 10, }}>
//                 {/* <CircleCheckBox
//                   checked={checked}
                 
//                   onToggle={() => {
//                     checkfunction();
//                   }}
//                 /> */}
//                 <RoundCheckbox
//   size={24}
//   checked={checked}
//   onValueChange={checkfunction}
// />
//               </View>
//             )}
//           </CardItem>
//         </Card>
//       </View>
//     </View>
//   );
// };

// export default LoanCard;

// const styles = StyleSheet.create({
//   CardStyle: {
//     flex: 1 / 5,
//     marginLeft: "2%",
//     borderRadius: 12,
//     elevation: 5,
//     paddingTop: "2%",
//     paddingBottom: "2%",
//     paddingLeft: "2%",
//     paddingRight: "2%"
//   },
//   MainIconContainer: {
//     flex: 1 / 4,
//     justifyContent: "space-around",
//     flexDirection: "row"
//   },
//   SubContainer: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "#217ec4",
//     borderRadius: 10
//   },
//   MainContentContainer: {
//     flex: 1,
//     paddingLeft: "1%"
//   },
//   Icon: {
//     paddingTop: "3%",
//     paddingRight: "2%"
//   },
//   HeadingContainer: {
//     flex: 2,
//     flexDirection: "row",
//     paddingTop: "2%"
//   },
//   ProgressBar: {
//     flex: 1 / 2,
//     paddingRight: "2%"
//   },
//   CardMainText: {
//     flex: 1,
//     fontSize: 30,
//     fontFamily: "OpenSans-Light",
//     color: "black"
//   },
//   CardSomeText: {
//     flex: 1,
//     color: "#585858",
//     fontFamily: "Raleway-Light",
//     color: "black"
//   },
//   CardSubText: {
//     alignSelf: "flex-start",
//     //color: "#D0D0D0",
//     color: "black",
//     fontFamily: "OpenSans-Italic",
//     paddingRight: "2%",
//     fontSize: 14
//   }
// });
