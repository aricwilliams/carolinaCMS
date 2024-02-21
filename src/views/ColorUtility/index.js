import React from 'react';
import { Button, Paper, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AquaMarineStyle, NiceRedStyle, PurpleLoveStyle, GreenBeachStyle, MidnightCityStyle,
  SunriseStyle, CoolBluesStyle, DeepSpaceStyle, LemonLimeStyle, NeonLifeStyle,
  DiscoStyle, LoveCoupleStyle, AzureLaneStyle, PinkFlavourStyle, SlightOceanViewStyle,
  CitrusPeelStyle, OldHatStyle, DigitalWaterStyle, AshesStyle, VirginAmericaStyle,
  EndlessRiverStyle, ShiftyStyle, VanusaStyle, SublimeLightStyle, CoralReefStyle,
  SunnyDayStyle,
  ForestGreenStyle,
  OceanBlueStyle, RedWhiteHorizontalStyle,
  RedWhiteVerticalStyle,
  RedWhiteDiagonalStyle,
  RedYellowStyle,
  RedOrangeStyle,
  RedPinkStyle,
  RedPurpleStyle,
  RedBlackStyle,
  GreenBlackStyle,
  BlueBlackStyle,
  YellowBlackStyle,
  OrangeBlackStyle,
  PurpleBlackStyle,
  CyanBlackStyle,
  MagentaBlackStyle,
  LightBlueStyle,
  SkyBlueStyle,
  CornflowerBlueStyle,
  DodgerBlueStyle,
  SteelBlueStyle,
  PowderBlueStyle,
  LightSteelBlueStyle,
  BlackLightGrayStyle,
  BlackGrayStyle,
  BlackDarkGrayStyle,
  BlackLightSlateGrayStyle,
  BlackDimGrayStyle,
  YellowPaleGoldenrodStyle,
  YellowLightYellowStyle,
  YellowLightGoldenrodStyle,
  YellowGoldStyle,
  YellowKhakiStyle,
  RedLightSalmonStyle,
  RedSalmonStyle,
  RedDarkSalmonStyle,
  RedTomatoStyle,
  RedCoralStyle,
} from '../../Util';

function UtilFunc() {
  const handleButtonClick = (style) => {
    const gradientCode = style.backgroundImage;
    navigator.clipboard.writeText(gradientCode)
      .then(() => {
        console.log('Gradient code copied to clipboard:', gradientCode);
        toast.success(`Gradient code copied to clipboard: ${gradientCode}`, {
        });
      })
      .catch((error) => {
        console.error('Failed to copy gradient code:', error);
        toast.error('Failed to copy gradient code to clipboard', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const renderButton = (style) => (
    <Button
      variant="contained"
      style={{
        ...style,
        marginBottom: 10,
        transition: 'transform 0.3s', // Add smooth transition
      }}
      sx={{
        '&:hover': {
          transform: 'scale(1.1)', // Grow the button on hover
        },
      }}
      onClick={() => handleButtonClick(style)}
    >
      {style?.name}
    </Button>
  );

  return (
    <div>
      <Paper elevation={3}>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>

          {renderButton(AquaMarineStyle)}
          {renderButton(CoralReefStyle)}
          {renderButton(SunnyDayStyle)}
          {renderButton(MidnightCityStyle)}
          {renderButton(PurpleLoveStyle)}
          {renderButton(ForestGreenStyle)}
          {renderButton(GreenBeachStyle)}
          {renderButton(OceanBlueStyle)}
    
          {renderButton(SunriseStyle)}
          {renderButton(CoolBluesStyle)}
          {renderButton(DeepSpaceStyle)}
          {renderButton(LemonLimeStyle)}
          {renderButton(NeonLifeStyle)}
          {renderButton(DiscoStyle)}
      
          {renderButton(LoveCoupleStyle)}
          {renderButton(AzureLaneStyle)}
          {renderButton(PinkFlavourStyle)}
          {renderButton(SlightOceanViewStyle)}
          {renderButton(CitrusPeelStyle)}
          {renderButton(OldHatStyle)}
     
          {renderButton(DigitalWaterStyle)}
          {renderButton(AshesStyle)}
          {renderButton(VirginAmericaStyle)}
          {renderButton(EndlessRiverStyle)}
          {renderButton(ShiftyStyle)}
          {renderButton(VanusaStyle)}
          {renderButton(SublimeLightStyle)}
          {renderButton(NiceRedStyle)}
       
          {renderButton(RedWhiteHorizontalStyle)}
          {renderButton(RedWhiteVerticalStyle)}
          {renderButton(RedWhiteDiagonalStyle)}
          {renderButton(RedYellowStyle)}
          {renderButton(RedOrangeStyle)}
       
          {renderButton(RedPinkStyle)}
          {renderButton(RedPurpleStyle)}
       
          {renderButton(RedBlackStyle)}
          {renderButton(GreenBlackStyle)}
          {renderButton(BlueBlackStyle)}
          {renderButton(YellowBlackStyle)}
          {renderButton(OrangeBlackStyle)}
        
          {renderButton(PurpleBlackStyle)}
          {renderButton(CyanBlackStyle)}
          {renderButton(MagentaBlackStyle)}
          {renderButton(LightBlueStyle)}
          {renderButton(SkyBlueStyle)}
          {renderButton(CornflowerBlueStyle)}
          {renderButton(DodgerBlueStyle)}
          {renderButton(SteelBlueStyle)}
          {renderButton(PowderBlueStyle)}
          {renderButton(LightSteelBlueStyle)}
          {renderButton(BlackLightGrayStyle)}
          {renderButton(BlackGrayStyle)}
          {renderButton(BlackDarkGrayStyle)}
          {renderButton(BlackLightSlateGrayStyle)}
          {renderButton(BlackDimGrayStyle)}
          {renderButton(YellowPaleGoldenrodStyle)}
          {renderButton(YellowLightYellowStyle)}
          {renderButton(YellowLightGoldenrodStyle)}
          {renderButton(YellowGoldStyle)}
          {renderButton(YellowKhakiStyle)}
          {renderButton(RedLightSalmonStyle)}
          {renderButton(RedSalmonStyle)}
          {renderButton(RedDarkSalmonStyle)}
          {renderButton(RedTomatoStyle)}
          {renderButton(RedCoralStyle)}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default UtilFunc;
