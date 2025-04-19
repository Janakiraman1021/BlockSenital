import * as React from "react"
import { cn } from "@/lib/utils"

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative", className)} {...props} />
))
Timeline.displayName = "Timeline"

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex mb-6 last:mb-0", className)} {...props} />
))
TimelineItem.displayName = "TimelineItem"

interface TimelineSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineSeparator = React.forwardRef<HTMLDivElement, TimelineSeparatorProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col items-center", className)} {...props} />
))
TimelineSeparator.displayName = "TimelineSeparator"

interface TimelineDotProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("h-4 w-4 rounded-full bg-primary", className)} {...props} />
))
TimelineDot.displayName = "TimelineDot"

interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-0.5 h-full bg-white/10 my-1", className)} {...props} />
))
TimelineConnector.displayName = "TimelineConnector"

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1", className)} {...props} />
))
TimelineContent.displayName = "TimelineContent"

export { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent }
