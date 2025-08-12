"""
Mathematical Spirals in Nature - Educational Video
A 5-minute Manim animation exploring Fibonacci sequence, golden ratio, and natural spirals

Author: AI Video Generation Specialist
Duration: ~5 minutes
Resolution: 1080p
"""

from manim import *
import numpy as np

class MathematicalSpirals(Scene):
    def construct(self):
        # Scene 1: Title and Introduction (30 seconds)
        self.intro_scene()
        
        # Scene 2: Fibonacci Sequence (60 seconds)
        self.fibonacci_sequence()
        
        # Scene 3: Fibonacci Squares and Rectangle (60 seconds)
        self.fibonacci_squares()
        
        # Scene 4: Golden Ratio Emergence (45 seconds)
        self.golden_ratio_reveal()
        
        # Scene 5: Fibonacci Spiral Construction (75 seconds)
        self.spiral_construction()
        
        # Scene 6: Nature Examples (60 seconds)
        self.nature_examples()
        
        # Scene 7: Conclusion (30 seconds)
        self.conclusion()

    def intro_scene(self):
        """Opening title sequence with elegant typography"""
        # Background gradient
        background = Rectangle(
            width=config.frame_width, 
            height=config.frame_height,
            fill_color=[BLUE_E, PURPLE_E],
            fill_opacity=1
        )
        self.add(background)
        
        # Main title
        title = Text(
            "Mathematical Spirals",
            font_size=72,
            gradient=[GOLD, YELLOW]
        ).move_to(UP * 1.5)
        
        subtitle = Text(
            "The Hidden Mathematics of Nature",
            font_size=36,
            color=WHITE
        ).move_to(DOWN * 0.5)
        
        # Decorative spiral preview
        preview_spiral = ParametricFunction(
            lambda t: np.array([
                0.3 * t * np.cos(t),
                0.3 * t * np.sin(t),
                0
            ]),
            t_range=[0, 4*PI],
            color=GOLD
        ).move_to(DOWN * 2)
        
        # Animations
        self.play(
            Write(title),
            run_time=2
        )
        self.play(
            Write(subtitle),
            Create(preview_spiral),
            run_time=2
        )
        self.wait(1)
        
        # Clear screen
        self.play(
            FadeOut(title),
            FadeOut(subtitle),
            FadeOut(preview_spiral),
            FadeOut(background),
            run_time=1
        )

    def fibonacci_sequence(self):
        """Animated introduction to Fibonacci sequence"""
        # Title
        fib_title = Text("The Fibonacci Sequence", font_size=48, color=BLUE)
        fib_title.to_edge(UP)
        
        # Starting numbers
        numbers = VGroup()
        fib_values = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
        
        for i, val in enumerate(fib_values):
            num = Text(str(val), font_size=36, color=WHITE)
            num.move_to(LEFT * 4 + RIGHT * i * 0.8)
            numbers.add(num)
        
        # Rule explanation
        rule = Text(
            "Each number is the sum of the two preceding ones",
            font_size=24,
            color=YELLOW
        ).move_to(DOWN * 2)
        
        self.play(Write(fib_title), run_time=1)
        self.play(Write(rule), run_time=2)
        
        # Animate sequence generation
        self.play(Write(numbers[0]), Write(numbers[1]), run_time=1)
        
        for i in range(2, len(fib_values)):
            # Highlight the two numbers being added
            self.play(
                numbers[i-2].animate.set_color(YELLOW),
                numbers[i-1].animate.set_color(YELLOW),
                run_time=0.5
            )
            
            # Show addition
            plus = Text("+", font_size=24, color=YELLOW)
            plus.move_to(numbers[i-1].get_center() + RIGHT * 0.3 + UP * 0.5)
            equals = Text("=", font_size=24, color=YELLOW)
            equals.move_to(numbers[i-1].get_center() + RIGHT * 0.5 + DOWN * 0.5)
            
            self.play(Write(plus), Write(equals), run_time=0.3)
            self.play(Write(numbers[i]), run_time=0.5)
            self.play(
                FadeOut(plus),
                FadeOut(equals),
                numbers[i-2].animate.set_color(WHITE),
                numbers[i-1].animate.set_color(WHITE),
                run_time=0.3
            )
        
        self.wait(2)
        self.play(
            FadeOut(fib_title),
            FadeOut(numbers),
            FadeOut(rule),
            run_time=1
        )

    def fibonacci_squares(self):
        """Create Fibonacci squares and rectangle"""
        title = Text("Fibonacci Squares", font_size=48, color=GREEN)
        title.to_edge(UP)
        
        self.play(Write(title), run_time=1)
        
        # Create squares with Fibonacci dimensions
        squares = VGroup()
        colors = [RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, PINK]
        fib_sizes = [1, 1, 2, 3, 5, 8]
        
        # Position squares to form the golden rectangle
        positions = [
            ORIGIN,
            RIGHT * 1,
            DOWN * 1,
            LEFT * 2,
            UP * 3,
            RIGHT * 5
        ]
        
        for i, (size, pos, color) in enumerate(zip(fib_sizes, positions, colors)):
            square = Square(
                side_length=size * 0.3,
                fill_color=color,
                fill_opacity=0.7,
                stroke_color=WHITE,
                stroke_width=2
            )
            
            # Adjust positioning for proper rectangle formation
            if i == 0:
                square.move_to(ORIGIN)
            elif i == 1:
                square.next_to(squares[0], RIGHT, buff=0)
            elif i == 2:
                square.next_to(squares[0], DOWN, buff=0, aligned_edge=LEFT)
            elif i == 3:
                square.next_to(squares[2], LEFT, buff=0, aligned_edge=DOWN)
            elif i == 4:
                square.next_to(squares[3], UP, buff=0, aligned_edge=LEFT)
            elif i == 5:
                square.next_to(squares[1], RIGHT, buff=0, aligned_edge=UP)
            
            squares.add(square)
            
            # Label with Fibonacci number
            label = Text(str(fib_sizes[i]), font_size=20, color=WHITE)
            label.move_to(square.get_center())
            
            self.play(
                Create(square),
                Write(label),
                run_time=0.8
            )
        
        # Show the golden rectangle outline
        self.wait(1)
        rectangle_outline = Rectangle(
            width=squares.get_width() + 0.1,
            height=squares.get_height() + 0.1,
            stroke_color=GOLD,
            stroke_width=4,
            fill_opacity=0
        ).move_to(squares.get_center())
        
        self.play(Create(rectangle_outline), run_time=2)
        self.wait(2)
        
        self.play(
            FadeOut(title),
            FadeOut(squares),
            FadeOut(rectangle_outline),
            run_time=1
        )

    def golden_ratio_reveal(self):
        """Reveal the golden ratio from Fibonacci ratios"""
        title = Text("The Golden Ratio Emerges", font_size=48, color=GOLD)
        title.to_edge(UP)
        
        self.play(Write(title), run_time=1)
        
        # Show ratios of consecutive Fibonacci numbers
        fib_nums = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
        ratios = []
        
        ratio_group = VGroup()
        
        for i in range(1, len(fib_nums)):
            ratio = fib_nums[i] / fib_nums[i-1]
            ratios.append(ratio)
            
            ratio_text = Text(
                f"{fib_nums[i]}/{fib_nums[i-1]} = {ratio:.6f}",
                font_size=24,
                color=WHITE
            )
            ratio_text.move_to(UP * 2 - DOWN * i * 0.3)
            ratio_group.add(ratio_text)
        
        # Animate ratios appearing
        for ratio_text in ratio_group:
            self.play(Write(ratio_text), run_time=0.4)
        
        self.wait(1)
        
        # Highlight convergence to golden ratio
        golden_ratio = Text(
            "φ = 1.618033988...",
            font_size=36,
            color=GOLD
        ).move_to(DOWN * 2)
        
        golden_name = Text(
            "The Golden Ratio",
            font_size=28,
            color=GOLD
        ).next_to(golden_ratio, DOWN)
        
        self.play(
            Write(golden_ratio),
            Write(golden_name),
            run_time=2
        )
        
        # Highlight how ratios converge
        for i in range(len(ratio_group)):
            if i > 5:  # Last few ratios
                self.play(
                    ratio_group[i].animate.set_color(GOLD),
                    run_time=0.3
                )
        
        self.wait(2)
        self.play(
            FadeOut(title),
            FadeOut(ratio_group),
            FadeOut(golden_ratio),
            FadeOut(golden_name),
            run_time=1
        )

    def spiral_construction(self):
        """Construct the Fibonacci spiral"""
        title = Text("The Fibonacci Spiral", font_size=48, color=PURPLE)
        title.to_edge(UP)
        
        self.play(Write(title), run_time=1)
        
        # Recreate the squares more compactly
        squares = VGroup()
        fib_sizes = [1, 1, 2, 3, 5, 8]
        colors = [RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE]
        
        # Create squares in spiral arrangement
        current_pos = ORIGIN
        squares_data = []
        
        for i, (size, color) in enumerate(zip(fib_sizes, colors)):
            square = Square(
                side_length=size * 0.2,
                fill_color=color,
                fill_opacity=0.5,
                stroke_color=WHITE,
                stroke_width=1
            )
            
            # Position squares in spiral pattern
            if i == 0:
                square.move_to(ORIGIN)
            elif i == 1:
                square.next_to(squares[0], RIGHT, buff=0)
            elif i == 2:
                square.next_to(squares[0], DOWN, buff=0, aligned_edge=LEFT)
            elif i == 3:
                square.next_to(squares[2], LEFT, buff=0, aligned_edge=DOWN)
            elif i == 4:
                square.next_to(squares[3], UP, buff=0, aligned_edge=LEFT)
            elif i == 5:
                square.next_to(squares[1], RIGHT, buff=0, aligned_edge=UP)
            
            squares.add(square)
            squares_data.append((square, size))
        
        # Show squares
        self.play(Create(squares), run_time=2)
        
        # Now draw quarter circles in each square
        arcs = VGroup()
        
        for i, (square, size) in enumerate(squares_data):
            center = square.get_center()
            radius = size * 0.1
            
            # Determine arc direction based on position in spiral
            if i == 0:
                start_angle = 0
            elif i == 1:
                start_angle = -PI/2
            elif i == 2:
                start_angle = PI
            elif i == 3:
                start_angle = PI/2
            elif i == 4:
                start_angle = 0
            elif i == 5:
                start_angle = -PI/2
            
            arc = Arc(
                radius=radius,
                start_angle=start_angle,
                angle=PI/2,
                color=GOLD,
                stroke_width=3
            ).move_to(center)
            
            arcs.add(arc)
            self.play(Create(arc), run_time=0.8)
        
        # Create the complete spiral
        complete_spiral = ParametricFunction(
            lambda t: np.array([
                0.1 * (1.618 ** (t/PI)) * np.cos(t),
                0.1 * (1.618 ** (t/PI)) * np.sin(t),
                0
            ]),
            t_range=[0, 6*PI],
            color=GOLD,
            stroke_width=4
        )
        
        self.wait(1)
        self.play(
            Create(complete_spiral),
            arcs.animate.set_opacity(0.3),
            run_time=3
        )
        
        self.wait(2)
        self.play(
            FadeOut(title),
            FadeOut(squares),
            FadeOut(arcs),
            FadeOut(complete_spiral),
            run_time=1
        )

    def nature_examples(self):
        """Show examples of spirals in nature"""
        title = Text("Spirals in Nature", font_size=48, color=GREEN)
        title.to_edge(UP)
        
        self.play(Write(title), run_time=1)
        
        # Create stylized representations of natural spirals
        examples = VGroup()
        
        # Nautilus shell
        nautilus = VGroup()
        shell_spiral = ParametricFunction(
            lambda t: np.array([
                0.3 * (1.2 ** (t/PI)) * np.cos(t),
                0.3 * (1.2 ** (t/PI)) * np.sin(t),
                0
            ]),
            t_range=[0, 4*PI],
            color=ORANGE,
            stroke_width=3
        )
        nautilus_label = Text("Nautilus Shell", font_size=20, color=WHITE)
        nautilus_label.next_to(shell_spiral, DOWN)
        nautilus.add(shell_spiral, nautilus_label)
        nautilus.move_to(LEFT * 4 + UP * 0.5)
        
        # Sunflower
        sunflower = VGroup()
        # Create sunflower seed pattern
        seeds = VGroup()
        for i in range(50):
            angle = i * 2.4  # Golden angle approximation
            radius = 0.1 * np.sqrt(i)
            seed = Dot(
                point=[radius * np.cos(angle), radius * np.sin(angle), 0],
                color=YELLOW,
                radius=0.02
            )
            seeds.add(seed)
        
        sunflower_label = Text("Sunflower Seeds", font_size=20, color=WHITE)
        sunflower_label.next_to(seeds, DOWN)
        sunflower.add(seeds, sunflower_label)
        sunflower.move_to(ORIGIN + UP * 0.5)
        
        # Galaxy
        galaxy = VGroup()
        galaxy_spiral = ParametricFunction(
            lambda t: np.array([
                0.4 * t * np.cos(t) * np.exp(-t/10),
                0.4 * t * np.sin(t) * np.exp(-t/10),
                0
            ]),
            t_range=[0, 8*PI],
            color=BLUE,
            stroke_width=2
        )
        # Add stars
        stars = VGroup()
        for i in range(20):
            star = Star(
                n=5,
                outer_radius=0.05,
                inner_radius=0.02,
                color=WHITE,
                fill_opacity=0.8
            )
            angle = i * 0.8
            radius = 0.1 * i
            star.move_to([
                radius * np.cos(angle) * np.exp(-i/15),
                radius * np.sin(angle) * np.exp(-i/15),
                0
            ])
            stars.add(star)
        
        galaxy_label = Text("Spiral Galaxy", font_size=20, color=WHITE)
        galaxy_label.next_to(galaxy_spiral, DOWN)
        galaxy.add(galaxy_spiral, stars, galaxy_label)
        galaxy.move_to(RIGHT * 4 + UP * 0.5)
        
        # Animate examples
        self.play(Create(nautilus), run_time=2)
        self.play(Create(sunflower), run_time=2)
        self.play(Create(galaxy), run_time=2)
        
        # Add connecting spirals
        connecting_text = Text(
            "The same mathematical pattern appears throughout nature!",
            font_size=24,
            color=GOLD
        ).move_to(DOWN * 2.5)
        
        self.play(Write(connecting_text), run_time=2)
        self.wait(3)
        
        self.play(
            FadeOut(title),
            FadeOut(nautilus),
            FadeOut(sunflower),
            FadeOut(galaxy),
            FadeOut(connecting_text),
            run_time=1
        )

    def conclusion(self):
        """Concluding thoughts and summary"""
        # Final spiral animation
        final_spiral = ParametricFunction(
            lambda t: np.array([
                0.5 * (1.618 ** (t/(2*PI))) * np.cos(t),
                0.5 * (1.618 ** (t/(2*PI))) * np.sin(t),
                0
            ]),
            t_range=[0, 8*PI],
            color=GOLD,
            stroke_width=4
        )
        
        conclusion_text = VGroup(
            Text("Mathematics reveals the hidden", font_size=32, color=WHITE),
            Text("patterns that connect all of nature", font_size=32, color=WHITE),
            Text("φ = 1.618...", font_size=48, color=GOLD)
        ).arrange(DOWN, buff=0.5).move_to(UP * 2)
        
        self.play(Create(final_spiral), run_time=3)
        self.play(Write(conclusion_text), run_time=2)
        
        # Add final decorative elements
        decorative_spirals = VGroup()
        for i in range(3):
            small_spiral = ParametricFunction(
                lambda t: np.array([
                    0.1 * t * np.cos(t + i * 2*PI/3),
                    0.1 * t * np.sin(t + i * 2*PI/3),
                    0
                ]),
                t_range=[0, 3*PI],
                color=BLUE,
                stroke_width=2
            ).move_to(DOWN * 2 + (i-1) * RIGHT * 2)
            decorative_spirals.add(small_spiral)
        
        self.play(Create(decorative_spirals), run_time=2)
        self.wait(3)
        
        # Fade to black
        self.play(
            FadeOut(final_spiral),
            FadeOut(conclusion_text),
            FadeOut(decorative_spirals),
            run_time=2
        )


# Additional scene for 3D visualization (optional)
class ThreeDSpiral(ThreeDScene):
    def construct(self):
        """3D Fibonacci spiral visualization"""
        self.set_camera_orientation(phi=75 * DEGREES, theta=45 * DEGREES)
        
        # 3D Fibonacci spiral
        spiral_3d = ParametricFunction(
            lambda t: np.array([
                0.3 * (1.618 ** (t/(2*PI))) * np.cos(t),
                0.3 * (1.618 ** (t/(2*PI))) * np.sin(t),
                t * 0.1
            ]),
            t_range=[0, 6*PI],
            color=GOLD,
            stroke_width=4
        )
        
        title_3d = Text("3D Fibonacci Spiral", font_size=48, color=GOLD)
        title_3d.to_edge(UP)
        
        self.add_fixed_in_frame_mobjects(title_3d)
        self.play(Write(title_3d), run_time=1)
        self.play(Create(spiral_3d), run_time=4)
        
        # Rotate the camera around the spiral
        self.begin_ambient_camera_rotation(rate=0.3)
        self.wait(8)
        self.stop_ambient_camera_rotation()


if __name__ == "__main__":
    # To render this video, run:
    # manim -pqh mathematical_spirals.py MathematicalSpirals
    # 
    # For 3D version:
    # manim -pqh mathematical_spirals.py ThreeDSpiral
    pass