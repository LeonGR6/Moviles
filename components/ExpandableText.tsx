import React, { useState } from 'react';
import { Text, View, Pressable } from '@gluestack-ui/themed';

interface ExpandableTextProps {
    text: string;
    collapsedLines: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
    text,
    collapsedLines,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View>
            <Text
                fontSize='$xl'
                fontFamily="$body"
                mt={5}
                numberOfLines={isExpanded ? undefined : collapsedLines}
                ellipsizeMode="tail"
            >
                {text}
            </Text>
            {!isExpanded && (
                <Pressable onPress={toggleExpanded}>
                    <Text
                        fontSize='$xl'
                        fontFamily="$body"
                        mt={5} style={{ color: 'blue' }}>
                        Expand
                    </Text>
                </Pressable>
            )}
        </View>
    );
};

export default ExpandableText;
