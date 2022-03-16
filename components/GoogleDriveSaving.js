import React from 'react'
import { View, Text } from 'react-native'

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-google-signin/google-signin'
import GDRIVE from "react-native-google-drive-api-wrapper"



export default function GoogleDriveSaving() {
    return (
        <View>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn}
                disabled={this.state.isSigninInProgress} />
        </View>
    )
}
