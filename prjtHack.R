library(ggplot2)
#install.packages('forecast',dependencies = TRUE)
library(forecast)
#install.packages('fpp2',dependencies = TRUE)
library(fpp2)


df = mergeddb

############################################################################
#Count
df
df1 = data.frame(cbind(year=df$publication_year, week=df$week, count=df$count))
df1
df2 = aggregate(df1$count, by= list(year=df1$year, week=df1$week), FUN =sum)
df3 = df2[order(df2$year), ]
df3
df.ts = ts(df3$x, start=c(2002,1),frequency = 52)
class(df.ts)

decomp = stl(df.ts, t.window =5, s.window = "periodic", robust = TRUE)
decomp
class(decomp)

Top100s = data.frame(cbind(title=df$title, year=df$publication_year, author=df$author))
Top100s
autoplot(decomp)+
  ggtitle("stl decomposition of Count")

ggseasonplot(df.ts, year,label= FALSE, continuous = TRUE, polar = TRUE)+
  ggtitle("seasonality through polarmap for count")


#Heat Map for count 
Time.stamp = seq(1, nrow(df1),1)

libdbc = cbind(df1, Time.stamp)
libdbc

ggplot(libdbc, aes(x = Time.stamp, y = 1)) +
  geom_tile(aes(fill = count)) +
  scale_fill_gradient2(low = "navy", mid = "yellow", 
                       high = "red", midpoint = 2) +
  ggtitle("Seasonality through Heatmap for Count") +
  ylab("")+ scale_y_discrete(expand = c(0,0))+ labs(fill = "count") 



fore = forecast(decomp, h=7, method = "naive", robust = FALSE)
fore


#get the seasonal component of the decomposition
trend = decomp$time.series[,2]
trend
autoplot(trend)

remainder = decomp$time.series[,3]
remainder

seasonal = decomp$time.series[,1]
seasonal
autoplot(seasonal)

ggseasonplot(seasonal, year,label= FALSE, continuous = TRUE, polar = TRUE)+
  ggtitle("seasonality through polarmap for seasonal component")

1-var(remainder,na.rm=TRUE)/var((trend+remainder),na.rm=TRUE)#Ft
1-var(remainder,na.rm=TRUE)/var((seasonal+remainder),na.rm=TRUE)#Fs

################################################################################
#Copies

dfc1 = data.frame(cbind(year=df$publication_year, week=df$week, copies=df$copies))
dfc1
dfc2 = aggregate(dfc1$copies, by= list(year=dfc1$year, week=dfc1$week), FUN =sum)
dfc3 = dfc2[order(dfc2$year), ]
dfc3
dfc.ts = ts(dfc3$x, start=c(2002,1),frequency = 52) #get copies into a time series
class(dfc.ts)
autoplot(dfc.ts)

decompc = stl(dfc.ts, t.window =5, s.window = "periodic", robust = TRUE)
decompc
class(decompc)


autoplot(decompc)+
  ggtitle("stl decomposition of Copies")

ggseasonplot(dfc.ts, year,label= FALSE, continuous = TRUE, polar = TRUE)+
  ggtitle("seasonality through polarmap")


#Heat Map
Time.stamp = seq(1, nrow(dfc1),1)

libdb = cbind(dfc1, Time.stamp)
libdb

ggplot(libdb, aes(x = Time.stamp, y = 1)) +
  geom_tile(aes(fill = copies)) +
  scale_fill_gradient2(low = "navy", mid = "yellow", 
                       high = "red", midpoint = 2) +
  ggtitle("Seasonality through Heatmap for Copies") +
  ylab("")+ scale_y_discrete(expand = c(0,0))+ labs(fill = "copies") 

fore = forecast(decompc, h=7, method = "naive", robust = FALSE)
fore
autoplot(fore)

#get the seasonal component of the decomposition
trendc = decompc$time.series[,2]
trend
autoplot(trendc)

remainderc = decompc$time.series[,3]
remainderc

seasonalc = decompc$time.series[,1]
seasonalc
autoplot(seasonalc)

1-var(remainderc,na.rm=TRUE)/var((trendc+remainderc),na.rm=TRUE)#Ft 0.996
1-var(remainderc,na.rm=TRUE)/var((seasonalc+remainderc),na.rm=TRUE)#Fs#0.21










