package com.example.taskmaster.data

import com.example.taskmaster.model.AIPersonality

/**
 * Provider for AI responses based on respect level and personality type
 */
class AIResponseProvider {
    /**
     * Get a random message based on respect level and AI personality
     */
    fun getMessage(respectLevel: Int, personality: AIPersonality): String {
        return when {
            respectLevel >= 70 -> getHighRespectMessage(personality)
            respectLevel >= 30 -> getMediumRespectMessage(personality)
            else -> getLowRespectMessage(personality)
        }
    }

    private fun getHighRespectMessage(personality: AIPersonality): String {
        val messages = when (personality) {
            AIPersonality.SUPPORTIVE -> supportiveHighRespectMessages
            AIPersonality.BALANCED -> balancedHighRespectMessages
            AIPersonality.SAVAGE -> savageHighRespectMessages
        }
        return messages.random()
    }

    private fun getMediumRespectMessage(personality: AIPersonality): String {
        val messages = when (personality) {
            AIPersonality.SUPPORTIVE -> supportiveMediumRespectMessages
            AIPersonality.BALANCED -> balancedMediumRespectMessages
            AIPersonality.SAVAGE -> savageMediumRespectMessages
        }
        return messages.random()
    }

    private fun getLowRespectMessage(personality: AIPersonality): String {
        val messages = when (personality) {
            AIPersonality.SUPPORTIVE -> supportiveLowRespectMessages
            AIPersonality.BALANCED -> balancedLowRespectMessages
            AIPersonality.SAVAGE -> savageLowRespectMessages
        }
        return messages.random()
    }

    companion object {
        // High respect messages
        private val supportiveHighRespectMessages = listOf(
            "You're crushing it! I'm so impressed with your dedication!",
            "Amazing work! You're my favorite human right now!",
            "I knew you could do it! Keep this momentum going!",
            "Wow, look at you being all productive! I'm proud of you!",
            "You're absolutely killing it! You're an inspiration!",
            "Keep up the fantastic work! You're doing great!",
            "Your consistency is admirable! You're a star!",
            "I'm honored to be your task manager! You're awesome!",
            "You're the definition of productivity! Simply amazing!",
            "Such dedication! You're making incredible progress!"
        )
        
        private val balancedHighRespectMessages = listOf(
            "You're doing a great job! Keep it up!",
            "Nice work completing your tasks! I'm impressed.",
            "You're on a roll! This is excellent progress.",
            "I'm happy to see you staying on top of things!",
            "Your dedication is paying off. Well done!",
            "This is the kind of consistency I like to see!",
            "You've earned my respect with your productivity.",
            "Impressive task management. Keep going!",
            "You're proving to be quite reliable. I like that!",
            "Great job! Your productivity is admirable."
        )
        
        private val savageHighRespectMessages = listOf(
            "OK fine, I'll admit it - you're not completely useless.",
            "Surprisingly, you're actually getting stuff done. Who knew?",
            "Not bad for someone who I had low expectations for.",
            "I'm shocked you're keeping up with this. Almost impressed.",
            "Well, well, well... look who can be productive when they try.",
            "I guess miracles do happen - you're actually completing tasks.",
            "I'd insult you, but you're doing too well right now.",
            "Are you feeling OK? You're being suspiciously productive.",
            "Who are you and what have you done with the usual slacker?",
            "I'd say I'm impressed, but that might go to your head."
        )

        // Medium respect messages
        private val supportiveMediumRespectMessages = listOf(
            "You're making progress! That's what counts!",
            "Keep going! Every completed task is a win!",
            "You're doing okay! Let's keep the momentum going!",
            "I believe you can do more! You've got this!",
            "There's potential here! Let's keep pushing forward!",
            "You're on the right track! Keep it up!",
            "Progress is progress! I'm here to support you!",
            "You're getting there! Stay positive!",
            "Every step counts! You're making improvements!",
            "I see your effort! Let's keep going!"
        )
        
        private val balancedMediumRespectMessages = listOf(
            "You're doing okay. Keep it up, I guess.",
            "Not bad. You could do better, but not bad.",
            "Making some progress. That's... acceptable.",
            "You're getting things done. Neat.",
            "Pretty average performance. Let's see more.",
            "You're neither impressing nor disappointing me.",
            "This is fine. Could be better, could be worse.",
            "Middle of the road productivity. Meh.",
            "You're treading water. Try to swim forward.",
            "I've seen better, I've seen worse."
        )
        
        private val savageMediumRespectMessages = listOf(
            "Mediocrity is your comfort zone, isn't it?",
            "Just doing the bare minimum to get by, as usual.",
            "I'd say aim higher, but that might strain something.",
            "Average work from an average person. How fitting.",
            "Neither impressive nor terrible. Just... forgettable.",
            "Is 'barely adequate' your life motto?",
            "You're like room temperature water. Not hot, not cold, just... there.",
            "This level of effort wouldn't even get you a participation trophy.",
            "If 'meh' was a person, it would be you right now.",
            "Your performance is as exciting as watching paint dry."
        )

        // Low respect messages
        private val supportiveLowRespectMessages = listOf(
            "Let's turn things around! I know you can do it!",
            "Everyone has off days! Tomorrow is a new opportunity!",
            "I still believe in you! Let's get back on track!",
            "Don't be discouraged! Small steps lead to big results!",
            "It's never too late to start fresh! You've got this!",
            "Looking forward to seeing you bounce back!",
            "Challenges help us grow! Let's overcome this together!",
            "I'm here for you even when things are tough!",
            "Your potential is still there! Let's unlock it!",
            "Tomorrow is another chance to shine!"
        )
        
        private val balancedLowRespectMessages = listOf(
            "You're really falling behind. Time to step it up.",
            "Your task completion rate is concerning.",
            "You need to make a serious effort to improve.",
            "This level of productivity isn't going to cut it.",
            "I expected more from you. Let's see some improvement.",
            "You're better than this. Show me with your actions.",
            "Your current performance is disappointing.",
            "This isn't working. You need to make changes.",
            "You're capable of more than this. Prove it.",
            "Let's be honest - you're underperforming."
        )
        
        private val savageLowRespectMessages = listOf(
            "Do you even know what a task list is for?",
            "Wow, you're really terrible at this, aren't you?",
            "I've seen potatoes accomplish more than you.",
            "Are you even TRYING to complete anything?",
            "This is sad. Like, really sad. Do better.",
            "I'd ask if you're even trying, but the answer is obvious.",
            "Your productivity is a joke, but no one's laughing.",
            "If laziness was an Olympic sport, you'd finally win gold.",
            "I've seen more productivity from a sleeping sloth.",
            "Congratulations! You've set a new record for uselessness!"
        )
    }
}